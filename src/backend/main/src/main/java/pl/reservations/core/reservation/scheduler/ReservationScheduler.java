package pl.reservations.core.reservation.scheduler;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import pl.reservations.core.reservation.repository.ReservationRepository;
import pl.reservations.core.reservation.model.Reservation;
import pl.reservations.core.reservation.service.KafkaProducer;
import pl.reservations.core.reservation.dto.ReservationMessageDto;
import pl.reservations.core.user.model.User;
import pl.reservations.core.user.repository.UserRepository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Service
public class ReservationScheduler {

    private final ReservationRepository reservationRepository;
    private final KafkaProducer kafkaProducer;
    private final UserRepository userRepository;

    public ReservationScheduler(ReservationRepository reservationRepository, KafkaProducer kafkaProducer, UserRepository userRepository) {
        this.reservationRepository = reservationRepository;
        this.kafkaProducer = kafkaProducer;
        this.userRepository = userRepository;
    }
    @Scheduled(cron = "0 0 9 * * *")  // Codziennie o północy
    public void sendReminderForTomorrowReservations() {
        LocalDate tomorrow = LocalDate.now().plusDays(1);
        List<Reservation> reservations = reservationRepository.findByReservationDate(tomorrow);

        for (Reservation reservation : reservations) {
            if (reservation.getStatus().equals("oczekujaca")) {

                User user = userRepository.findById(reservation.getUserId())
                        .orElseThrow(() -> new IllegalArgumentException("User not found"));

                ReservationMessageDto reminderMessage = new ReservationMessageDto();
                reminderMessage.setFirstName(user.getFirstname());
                reminderMessage.setLastName(user.getLastname());
                reminderMessage.setEmail(user.getEmail());
                reminderMessage.setDate(reservation.getReservationDate().toString());
                reminderMessage.setTime(reservation.getReservationTime());
                reminderMessage.setServiceName(reservation.getEmployeeOffer().getOffer().getTitle());


                kafkaProducer.sendReminderEmail(reminderMessage);
            }
        }
    }

    @Scheduled(cron = "0 0/15 * * * *")
    public void updateReservationStatuses() {
        List<Reservation> reservations = reservationRepository.findAll();

        for (Reservation reservation : reservations) {
            if (reservation.getStatus().equals("oczekujaca") &&
                    reservation.getReservationDate().isBefore(LocalDate.now()) ||
                    (reservation.getReservationDate().isEqual(LocalDate.now()) &&
                            LocalTime.parse(reservation.getReservationTime()).isBefore(LocalTime.now()))) {

                reservation.setStatus("zakończona");
                reservationRepository.save(reservation);
            }
        }
    }
}
