package pl.reservations.core.user.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.reservations.core.user.dto.UserDetailsDto;
import pl.reservations.core.user.service.UserManagementService;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/user-management")
@RequiredArgsConstructor
public class UserManagementController {

    private final UserManagementService userManagementService;

    @GetMapping
    public ResponseEntity<List<UserDetailsDto>> getAllUsers() {
        return ResponseEntity.ok(userManagementService.getAllUsers());
    }

    @PutMapping("/block/{userId}")
    public ResponseEntity<Void> blockUser(@PathVariable UUID userId) {
        userManagementService.blockUser(userId);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/unblock/{userId}")
    public ResponseEntity<Void> unblockUser(@PathVariable UUID userId) {
        userManagementService.unblockUser(userId);
        return ResponseEntity.noContent().build();
    }
}
