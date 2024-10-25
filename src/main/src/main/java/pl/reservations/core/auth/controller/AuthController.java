package pl.reservations.core.auth.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import pl.reservations.core.auth.dto.*;
import pl.reservations.core.auth.service.AuthService;
import pl.reservations.core.auth.service.EmailService;
import pl.reservations.core.auth.service.RefreshTokenService;
import pl.reservations.core.security.JwtUtils;
import pl.reservations.core.auth.model.RefreshToken;
import pl.reservations.core.user.model.User;
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
    private JwtUtils jwtUtils;

    @Autowired
    private RefreshTokenService refreshTokenService;

    @Autowired
    private AuthService authService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        try {
            User user = authService.validateLoginRequest(loginRequest);
            Authentication authentication = authenticate(loginRequest.getUsername(), loginRequest.getPassword());
            return createLoginResponse(user, authentication);
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorResponse("Incorrect password!"));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponse(e.getMessage()));
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody SignupRequest signUpRequest) {
        try {
            User user = authService.registerNewUser(signUpRequest, passwordEncoder);
            authService.sendActivationEmail(user);
            return ResponseEntity.ok(new SuccessResponse("User registered successfully! Please check your email to activate your account."));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("User registered, but failed to send activation email. Please contact support."));
        }
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<?> refreshJwtToken(@CookieValue(name = "refreshToken") String refreshToken) {
        return authService.refreshToken(refreshToken);
    }

    @GetMapping("/activate")
    public ResponseEntity<?> activateAccount(@RequestParam("token") String token) {
        try {
            User user = authService.activateUserAccount(token);
            Authentication authentication = createAuthentication(user);
            return createLoginResponse(user, authentication);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(new ErrorResponse("Invalid token format."));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse(e.getMessage()));
        }
    }

    @PostMapping("/resend-activation")
    public ResponseEntity<?> resendActivationLink(@RequestBody ResendActivationRequest request) {
        try {
            authService.resendActivationLink(request.getEmail());
            return ResponseEntity.ok(new SuccessResponse("Activation link sent successfully. Please check your email."));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Failed to send activation email. Please contact support."));
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logoutUser() {
        SecurityContextHolder.clearContext();
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, authService.createExpiredCookie("jwt").toString())
                .header(HttpHeaders.SET_COOKIE, authService.createExpiredCookie("refreshToken").toString())
                .body(new SuccessResponse("Logout successful!"));
    }

    @GetMapping("/autologin")
    public ResponseEntity<?> autologin(@CookieValue(name = "refreshToken", required = false) String refreshToken) {
        return authService.autoLogin(refreshToken);
    }

    private Authentication authenticate(String username, String password) {
        return authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(username, password)
        );
    }

    private Authentication createAuthentication(User user) {
        return new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
    }

    private ResponseEntity<?> createLoginResponse(User user, Authentication authentication) {
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);
        RefreshToken refreshToken = refreshTokenService.createOrGetRefreshToken(user);
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, authService.createJwtCookie(jwt).toString())
                .header(HttpHeaders.SET_COOKIE, authService.createRefreshTokenCookie(refreshToken.getToken()).toString())
                .body(new UserResponse(user.getUsername(), user.getEmail(), user.getFirstname(), user.getLastname()));
    }
}
