package pl.reservations.core.employee.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.Setter;
import pl.reservations.core.offer.model.Offer;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "employee_offer")
public class EmployeeOffer {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "employee_id")
    @JsonBackReference
    private Employee employee;

    @ManyToOne
    @JoinColumn(name = "offer_id")
    @JsonBackReference
    private Offer offer;


    @Column(name = "price")
    private Float price;

    @Column(name = "time")
    private String time;
}
