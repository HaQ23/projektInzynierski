package pl.reservations.core.employee.model;

import lombok.Getter;
import lombok.Setter;

import jakarta.persistence.*;
import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "employee_schedule")
public class EmployeeSchedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "date")
    private LocalDate date;

    @Column(name = "unavailable_from")
    private String unavailableFrom;

    @Column(name = "time")
    private int time;

    @ManyToOne
    @JoinColumn(name = "employee_id")
    private Employee employee;
}
