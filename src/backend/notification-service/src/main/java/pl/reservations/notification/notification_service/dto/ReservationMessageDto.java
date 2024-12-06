package pl.reservations.notification.notification_service.dto;

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
