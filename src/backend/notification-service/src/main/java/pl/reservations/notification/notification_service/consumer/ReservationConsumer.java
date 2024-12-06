package pl.reservations.notification.notification_service.consumer;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;
import pl.reservations.notification.notification_service.dto.ReservationMessageDto;
import pl.reservations.notification.notification_service.service.EmailService;

@Component
public class ReservationConsumer {

    private final EmailService emailService;
    private final ObjectMapper objectMapper;

    public ReservationConsumer(EmailService emailService, ObjectMapper objectMapper) {
        this.emailService = emailService;
        this.objectMapper = objectMapper;
    }

    @KafkaListener(topics = "reservations.new", groupId = "notification-group")
    public void listenNewReservation(String message) {
        try {
            ReservationMessageDto reservation = objectMapper.readValue(message, ReservationMessageDto.class);
            emailService.sendNewReservationEmail(reservation.getEmail(), reservation.getFirstName(), reservation.getLastName(), reservation.getServiceName(), reservation.getDate(), reservation.getTime());
        } catch (Exception e) {
            System.out.println("Error processing new reservation message: " + e.getMessage());
        }
    }

    @KafkaListener(topics = "reservations.cancel", groupId = "notification-group")
    public void listenCancelReservation(String message) {
        try {
            ReservationMessageDto reservation = objectMapper.readValue(message, ReservationMessageDto.class);
            emailService.sendCancellationEmail(reservation.getEmail(), reservation.getFirstName(), reservation.getLastName(), reservation.getServiceName(), reservation.getDate(), reservation.getTime());
        } catch (Exception e) {
            System.out.println("Error processing cancel reservation message: " + e.getMessage());
        }
    }

    @KafkaListener(topics = "reservations.reminder", groupId = "notification-group")
    public void listenReminderReservation(String message) {
        try {
            ReservationMessageDto reservation = objectMapper.readValue(message, ReservationMessageDto.class);
            emailService.sendReminderEmail(reservation.getEmail(), reservation.getFirstName(), reservation.getLastName(), reservation.getServiceName(), reservation.getDate(), reservation.getTime());
        } catch (Exception e) {
            System.out.println("Error processing reminder reservation message: " + e.getMessage());
        }
    }
}
