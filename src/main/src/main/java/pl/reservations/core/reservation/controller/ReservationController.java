package pl.reservations.core.reservation.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import pl.reservations.core.reservation.dto.ReservationDto;
import pl.reservations.core.reservation.service.ReservationService;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/reservations")
@RequiredArgsConstructor
public class ReservationController {

    private final ReservationService reservationService;

    @PostMapping
    public ResponseEntity<ReservationDto> addReservation(@RequestBody ReservationDto reservationDto) {
        UUID userId = getCurrentUserId();
        return ResponseEntity.ok(reservationService.addReservation(reservationDto, userId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ReservationDto> updateReservation(@PathVariable Long id, @RequestBody ReservationDto reservationDto) {
        UUID userId = getCurrentUserId();
        return ResponseEntity.ok(reservationService.updateReservation(id, reservationDto, userId));
    }

    @PutMapping("/cancel/{id}")
    public ResponseEntity<Void> cancelReservation(@PathVariable Long id) {
        UUID userId = getCurrentUserId();
        reservationService.cancelReservation(id, userId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/user-reservations")
    public ResponseEntity<List<ReservationDto>> getAllUserReservations() {
        UUID userId = getCurrentUserId();
        return ResponseEntity.ok(reservationService.getAllReservationsByUserId(userId));
    }

    @GetMapping
    public ResponseEntity<List<ReservationDto>> getAllReservations() {
        return ResponseEntity.ok(reservationService.getAllReservations());
    }

    private UUID getCurrentUserId() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserDetails) {
            UserDetails userDetails = (UserDetails) principal;
            return ((pl.reservations.core.user.model.User) userDetails).getId();
        }
        throw new IllegalStateException("Nie udało się pobrać ID użytkownika z JWT");
    }
}
