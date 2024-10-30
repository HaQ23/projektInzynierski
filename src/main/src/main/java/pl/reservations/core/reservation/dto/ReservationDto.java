package pl.reservations.core.reservation.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReservationDto {
    private Long id;
    private LocalDate reservationDate;
    private LocalTime reservationTime;
    private Long employeeOfferId;
    private UUID userId;
    private int duration;
    private String status;
}
