package pl.reservations.core.employee.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.reservations.core.employee.model.EmployeeOffer;

import java.util.List;

public interface EmployeeOfferRepository extends JpaRepository<EmployeeOffer, Long> {
    List<EmployeeOffer> findByEmployeeId(Long employeeId);
}
