package pl.reservations.core.employee.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.reservations.core.employee.model.EmployeeOffer;

public interface EmployeeOfferRepository extends JpaRepository<EmployeeOffer, Long> {
}
