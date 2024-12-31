package pl.reservations.core.employee.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.reservations.core.employee.model.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
}
