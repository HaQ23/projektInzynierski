package pl.reservations.core.reservation.model;

import lombok.Getter;
import lombok.Setter;
import pl.reservations.core.employee.model.EmployeeOffer;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "reservation")
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "reservation_date", nullable = false)
    private LocalDate reservationDate;

    @Column(name = "reservation_time", nullable = false)
    private LocalTime reservationTime;

    @Column(name = "user_id", nullable = false)
    private UUID userId;

    @ManyToOne
    @JoinColumn(name = "employee_offer_id", nullable = false)
    private EmployeeOffer employeeOffer;

    @Column(name = "status", nullable = false)
    private String status;
}
