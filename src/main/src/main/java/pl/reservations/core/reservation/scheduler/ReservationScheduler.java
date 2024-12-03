package pl.reservations.core.reservation.scheduler;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import pl.reservations.core.reservation.repository.ReservationRepository;
import pl.reservations.core.reservation.model.Reservation;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Service
public class ReservationScheduler {

    private final ReservationRepository reservationRepository;

    public ReservationScheduler(ReservationRepository reservationRepository) {
        this.reservationRepository = reservationRepository;
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
