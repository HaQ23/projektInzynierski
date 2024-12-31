package pl.reservations.core.reservation.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class ReservationDto {
    private Long id;
    private LocalDate reservationDate;
    private String reservationTime;
    private String employeeFirstName;
    private String employeeLastName;
    private String offerName;
    private Float price;
    private UUID userId;
    private String status;
    private Long employeeOfferId;
}
