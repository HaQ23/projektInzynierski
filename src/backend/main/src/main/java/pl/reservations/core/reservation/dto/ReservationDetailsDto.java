package pl.reservations.core.reservation.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReservationDetailsDto {
    private Long id;
    private java.time.LocalDate reservationDate;
    private String reservationTime;
    private String offerName;
    private Float price;
    private String status;
    private Long employeeOfferId;
    private Long employeeId;
    private String employeeFirstName;
    private String employeeLastName;
    private int duration;
    private String userId;
    private String userFirstName;
    private String userLastName;
    private Long serviceId;
}
