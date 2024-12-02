package pl.reservations.core.user.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import pl.reservations.core.user.dto.ChangePasswordRequest;
import pl.reservations.core.user.dto.MessageResponse;
import pl.reservations.core.user.dto.UpdateUserRequest;
import pl.reservations.core.user.dto.UserResponse;
import pl.reservations.core.user.model.User;
import pl.reservations.core.user.service.UserService;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    public ResponseEntity<UserResponse> getCurrentUser(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(userService.getCurrentUser(user));
    }

    @PutMapping("/change-password")
    public ResponseEntity<MessageResponse> changePassword(@AuthenticationPrincipal User user,
                                                          @RequestBody ChangePasswordRequest request) {
        return userService.changePassword(user, request);
    }

    @PutMapping("/update-info")
    public ResponseEntity<MessageResponse> updateUserInfo(@AuthenticationPrincipal User user,
                                                          @RequestBody UpdateUserRequest request) {
        return userService.updateUserInfo(user, request);
    }
}
