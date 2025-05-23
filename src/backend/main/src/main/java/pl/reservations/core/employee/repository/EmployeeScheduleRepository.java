package pl.reservations.core.employee.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.reservations.core.employee.model.EmployeeSchedule;

import java.time.LocalDate;
import java.util.List;

public interface EmployeeScheduleRepository extends JpaRepository<EmployeeSchedule, Long> {

    List<EmployeeSchedule> findByDateAndEmployeeId(LocalDate date, Long id);
}
