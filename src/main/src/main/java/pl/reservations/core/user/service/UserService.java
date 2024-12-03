package pl.reservations.core.user.service;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pl.reservations.core.user.dto.ChangePasswordRequest;
import pl.reservations.core.user.dto.MessageResponse;
import pl.reservations.core.user.dto.UpdateUserRequest;
import pl.reservations.core.user.dto.UserResponse;
import pl.reservations.core.user.model.User;
import pl.reservations.core.user.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public UserResponse getCurrentUser(User user) {
        return new UserResponse(
                user.getUsername(),
                user.getEmail(),
                user.getFirstname(),
                user.getLastname(),
                user.getPhoneNumber(),
                user.getAddress(),
                user.getRole().getName()
        );
    }

    public ResponseEntity<MessageResponse> changePassword(User user, ChangePasswordRequest request) {
        if (!passwordEncoder.matches(request.getOldPassword(), user.getPassword())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new MessageResponse("Podano nieprawidłowe stare hasło."));
        }

        if (request.getOldPassword().equals(request.getNewPassword())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new MessageResponse("Nowe hasło musi być inne niż stare."));
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
        return ResponseEntity.ok(new MessageResponse("Hasło zostało zmienione pomyślnie."));
    }

    public ResponseEntity<MessageResponse> updateUserInfo(User user, UpdateUserRequest request) {
        user.setEmail(request.getEmail());
        user.setFirstname(request.getFirstname());
        user.setLastname(request.getLastname());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setAddress(request.getAddress());

        userRepository.save(user);
        return ResponseEntity.ok(new MessageResponse("Dane użytkownika zostały zaktualizowane pomyślnie."));
    }
}
