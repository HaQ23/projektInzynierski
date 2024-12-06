package pl.reservations.core.unavailable_day.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.reservations.core.unavailable_day.model.UnavailableDay;

import java.time.LocalDate;

public interface UnavailableDaysRepository extends JpaRepository<UnavailableDay, Long> {
    boolean existsByDate(LocalDate date);
    void deleteByDateBefore(LocalDate date);
}
