package pl.reservations.core.reservation.service;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import pl.reservations.core.reservation.dto.ReservationMessageDto;

@Service
public class KafkaProducer {

    private final KafkaTemplate<String, Object> kafkaTemplate;

    public KafkaProducer(KafkaTemplate<String, Object> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void sendNewReservation(ReservationMessageDto reservationMessageDto) {
        kafkaTemplate.send("reservations.new", reservationMessageDto);
    }

    public void sendCancelReservation(ReservationMessageDto reservationMessageDto) {
        kafkaTemplate.send("reservations.cancel", reservationMessageDto);
    }

    public void sendReminderEmail(ReservationMessageDto reservationMessageDto) {
        kafkaTemplate.send("reservations.reminder", reservationMessageDto);
    }
}
