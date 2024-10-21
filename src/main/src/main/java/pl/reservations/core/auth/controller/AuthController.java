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
import pl.reservations.core.auth.dto.JwtResponse;
import pl.reservations.core.auth.dto.LoginRequest;
import pl.reservations.core.auth.dto.RefreshTokenRequest;
import pl.reservations.core.auth.dto.SignupRequest;
import pl.reservations.core.auth.service.RefreshTokenService;
import pl.reservations.core.security.JwtUtils;
import pl.reservations.core.auth.model.RefreshToken;
import pl.reservations.core.user.model.Role;
import pl.reservations.core.user.model.User;
import pl.reservations.core.user.repository.RoleRepository;
import pl.reservations.core.user.repository.UserRepository;

import java.util.Optional;

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

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        if (!userRepository.existsByUsername(loginRequest.getUsername())) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error: Username not found!");
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

            User user = userRepository.findByUsername(loginRequest.getUsername()).get();
            RefreshToken refreshToken = refreshTokenService.createOrGetRefreshToken(user);

            return ResponseEntity.ok(new JwtResponse(jwt, refreshToken.getToken()));
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Error: Incorrect password!");
        }
    }


    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody SignupRequest signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: Username is already taken!");
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: Email is already in use!");
        }

        Optional<Role> userRole = roleRepository.findByName("USER");
        if (userRole.isEmpty()) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: User role not found.");
        }

      
        User user = new User(
                signUpRequest.getUsername(),
                signUpRequest.getEmail(),
                passwordEncoder.encode(signUpRequest.getPassword()),
                userRole.get()
        );

        userRepository.save(user);
        return ResponseEntity.ok("User registered successfully!");
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



}
