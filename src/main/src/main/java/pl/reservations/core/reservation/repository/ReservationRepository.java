
package pl.reservations.core.reservation.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import pl.reservations.core.reservation.model.Reservation;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findByUserId(UUID userId);

    List<Reservation> findByUserIdAndStatus(UUID userId, String status);

    List<Reservation> findByUserIdAndReservationDateBeforeAndStatusNot(
            UUID userId, LocalDate reservationDate, String status);
    @Query("SELECT r FROM Reservation r WHERE r.employeeOffer.employee.id = :employeeId AND r.reservationDate BETWEEN :start AND :end")
    List<Reservation> findReservationsByEmployeeAndDateRange(
            @Param("employeeId") Long employeeId,
            @Param("start") LocalDate start,
            @Param("end") LocalDate end);
    @Query("SELECT r FROM Reservation r WHERE r.employeeOffer.employee.id = :employeeId")
    List<Reservation> findReservationsByEmployeeId(@Param("employeeId") Long employeeId);
    int countReservationsByUserId(UUID userId);
}
