package pl.reservations.core.auth.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import pl.reservations.core.auth.dto.*;
import pl.reservations.core.auth.service.EmailService;
import pl.reservations.core.auth.service.RefreshTokenService;
import pl.reservations.core.security.JwtUtils;
import pl.reservations.core.auth.model.RefreshToken;
import pl.reservations.core.user.model.Role;
import pl.reservations.core.user.model.User;
import pl.reservations.core.user.repository.RoleRepository;
import pl.reservations.core.user.repository.UserRepository;

import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private RefreshTokenService refreshTokenService;

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private EmailService emailService;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        Optional<User> userOptional = userRepository.findByUsername(loginRequest.getUsername());

        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error: Username not found!");
        }

        User user = userOptional.get();
        if (!user.isEnabled()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Error: Account not activated! Please check your email for the activation link.");
        }

        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getUsername(),
                            loginRequest.getPassword()
                    )
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = jwtUtils.generateJwtToken(authentication);

            RefreshToken refreshToken = refreshTokenService.createOrGetRefreshToken(user);

            return ResponseEntity.ok(new JwtResponse(jwt, refreshToken.getToken()));
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Error: Incorrect password!");
        }
    }


    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody SignupRequest signUpRequest) {

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity.badRequest().body("Error: Email is already in use!");
        }


        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity.badRequest().body("Error: Username is already taken!");
        }

        Role userRole = roleRepository.findByName("USER")
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));


        User user = new User(
                signUpRequest.getUsername(),
                passwordEncoder.encode(signUpRequest.getPassword()),
                signUpRequest.getEmail(),
                signUpRequest.getFirstname(),
                signUpRequest.getLastname(),
                signUpRequest.getPhoneNumber(),
                signUpRequest.getAddress(),
                userRole
        );


        userRepository.save(user);


        String activationLink = "http://localhost:8080/api/auth/activate?token=" + user.getActivationToken();

        try {

            emailService.sendActivationEmail(user.getEmail(), activationLink);
        } catch (Exception e) {

            System.err.println("Error sending activation email: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("User registered, but failed to send activation email. Please contact support.");
        }

        return ResponseEntity.ok("User registered successfully! Please check your email to activate your account.");
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<?> refreshToken(@RequestBody RefreshTokenRequest request) {
        String refreshToken = request.getRefreshToken();
        System.out.println("Otrzymano refresh token: " + refreshToken);

        return refreshTokenService.findByToken(refreshToken)
                .map(token -> {
                    if (!refreshTokenService.isValid(token)) {
                        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Error: Refresh token is expired!");
                    }

                    User user = token.getUser();
                    UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                            user, null, user.getAuthorities());

                    String newJwt = jwtUtils.generateJwtToken(authentication);
                    return ResponseEntity.ok(new JwtResponse(newJwt, token.getToken()));
                })
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error: Refresh token not found!"));
    }

    @GetMapping("/activate")
    public ResponseEntity<?> activateAccount(@RequestParam("token") String token) {
        try {

            UUID activationToken = UUID.fromString(token);


            Optional<User> userOptional = userRepository.findByActivationToken(activationToken);

            if (userOptional.isEmpty()) {
                return ResponseEntity.badRequest().body("Error: Invalid or expired activation token.");
            }


            User user = userOptional.get();
            user.setEnabled(true);
            user.setActivationToken(null);
            userRepository.save(user);

            return ResponseEntity.ok("Account activated successfully! You can now log in.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Error: Invalid token format.");
        }
    }

    @PostMapping("/resend-activation")
    public ResponseEntity<?> resendActivationLink(@RequestBody ResendActivationRequest request) {
        Optional<User> optionalUser = userRepository.findByEmail(request.getEmail());

        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error: Email not found!");
        }

        User user = optionalUser.get();

        if (user.isEnabled()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: Account already activated!");
        }


        if (user.getActivationToken() == null) {
            user.setActivationToken(UUID.randomUUID());
            userRepository.save(user);
        }

        String activationLink = "http://localhost:8080/api/auth/activate?token=" + user.getActivationToken();

        try {
            emailService.sendActivationEmail(user.getEmail(), activationLink);
        } catch (Exception e) {
            System.err.println("Error sending activation email: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error: Failed to send activation email. Please contact support.");
        }

        return ResponseEntity.ok("Activation link sent successfully. Please check your email.");
    }


}
