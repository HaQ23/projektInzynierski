
package pl.reservations.core.reservation.repository;

        import org.springframework.data.jpa.repository.JpaRepository;
        import pl.reservations.core.reservation.model.Reservation;

        import java.util.List;
        import java.util.UUID;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findByUserId(UUID userId);
    List<Reservation> findByUserId(Long userId);
}
