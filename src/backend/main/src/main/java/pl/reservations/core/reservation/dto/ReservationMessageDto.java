package pl.reservations.core.reservation.dto;

import lombok.Data;

@Data
public class ReservationMessageDto {
    private String firstName;
    private String lastName;
    private String email;
    private String date;
    private String time;
    private String serviceName;
}
