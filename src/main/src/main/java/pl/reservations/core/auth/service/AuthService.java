package pl.reservations.core.auth.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pl.reservations.core.auth.dto.ErrorResponse;
import pl.reservations.core.auth.dto.LoginRequest;
import pl.reservations.core.auth.dto.SignupRequest;
import pl.reservations.core.auth.dto.SuccessResponse;
import pl.reservations.core.auth.model.RefreshToken;
import pl.reservations.core.security.JwtUtils;
import pl.reservations.core.user.model.User;
import pl.reservations.core.user.repository.RoleRepository;
import pl.reservations.core.user.repository.UserRepository;

import java.util.Optional;
import java.util.UUID;

@Service
public class AuthService {

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

    public User validateLoginRequest(LoginRequest loginRequest) {
        Optional<User> userOptional = userRepository.findByUsername(loginRequest.getUsername());

        if (userOptional.isEmpty()) {
            throw new RuntimeException("Username not found!");
        }

        User user = userOptional.get();
        if (!user.isEnabled()) {
            throw new RuntimeException("Account not activated! Please check your email for the activation link.");
        }

        return user;
    }

    public User registerNewUser(SignupRequest signUpRequest, PasswordEncoder passwordEncoder) {
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            throw new RuntimeException("Email is already in use!");
        }

        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            throw new RuntimeException("Username is already taken!");
        }

        User user = new User(
                signUpRequest.getUsername(),
                passwordEncoder.encode(signUpRequest.getPassword()),
                signUpRequest.getEmail(),
                signUpRequest.getFirstname(),
                signUpRequest.getLastname(),
                signUpRequest.getPhoneNumber(),
                signUpRequest.getAddress(),
                roleRepository.findByName("USER").orElseThrow(() -> new RuntimeException("Error: Role is not found."))
        );

        userRepository.save(user);
        return user;
    }

    public void sendActivationEmail(User user) throws Exception {
        String activationLink = "http://localhost:4200/auth/activate-account?token=" + user.getActivationToken();
        emailService.sendActivationEmail(user.getEmail(), activationLink);
    }

    public User activateUserAccount(String token) {
        UUID activationToken = UUID.fromString(token);
        Optional<User> userOptional = userRepository.findByActivationToken(activationToken);

        if (userOptional.isEmpty()) {
            throw new RuntimeException("Invalid or expired activation token.");
        }

        User user = userOptional.get();

        if (user.isEnabled()) {
            throw new RuntimeException("Account already activated.");
        }

        user.setEnabled(true);
        user.setActivationToken(null);
        userRepository.save(user);

        return user;
    }

    public void resendActivationLink(String email) throws Exception {
        Optional<User> optionalUser = userRepository.findByEmail(email);

        if (optionalUser.isEmpty()) {
            throw new RuntimeException("Email not found!");
        }

        User user = optionalUser.get();

        if (user.isEnabled()) {
            throw new RuntimeException("Account already activated!");
        }

        if (user.getActivationToken() == null) {
            user.setActivationToken(UUID.randomUUID());
            userRepository.save(user);
        }

        sendActivationEmail(user);
    }
    public ResponseEntity<?> refreshToken(String refreshToken) {
        return refreshTokenService.findByToken(refreshToken)
                .map(token -> {
                    if (!refreshTokenService.isValid(token)) {
                        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorResponse("Refresh token is expired!"));
                    }

                    User user = token.getUser();
                    UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                            user, null, user.getAuthorities());

                    SecurityContextHolder.getContext().setAuthentication(authentication);

                    String newJwt = jwtUtils.generateJwtToken(authentication);

                    ResponseCookie jwtCookie = createJwtCookie(newJwt);

                    return ResponseEntity.ok()
                            .header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
                            .body(new pl.reservations.core.auth.dto.UserResponse(user.getUsername(), user.getEmail(), user.getFirstname(), user.getLastname()));
                })
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponse("Refresh token not found!")));
    }

    public ResponseEntity<?> autoLogin(String refreshToken) {
        if (refreshToken == null) {
            return ResponseEntity.ok().body(null);
        }

        return refreshTokenService.findByToken(refreshToken)
                .map(token -> {
                    if (!refreshTokenService.isValid(token)) {
                        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorResponse("Refresh token is expired!"));
                    }

                    User user = token.getUser();
                    UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                            user, null, user.getAuthorities());

                    SecurityContextHolder.getContext().setAuthentication(authentication);

                    String newJwt = jwtUtils.generateJwtToken(authentication);

                    ResponseCookie jwtCookie = createJwtCookie(newJwt);

                    return ResponseEntity.ok()
                            .header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
                            .body(new pl.reservations.core.auth.dto.UserResponse(user.getUsername(), user.getEmail(), user.getFirstname(), user.getLastname()));
                })
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponse("Refresh token not found!")));
    }

    public ResponseCookie createJwtCookie(String jwt) {
        return ResponseCookie.from("jwt", jwt)
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(60 * 15)
                .build();
    }

    public ResponseCookie createRefreshTokenCookie(String refreshToken) {
        return ResponseCookie.from("refreshToken", refreshToken)
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(60 * 60 * 24 * 7)
                .build();
    }

    public ResponseCookie createExpiredCookie(String cookieName) {
        return ResponseCookie.from(cookieName, null)
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(0)
                .build();
    }
}
