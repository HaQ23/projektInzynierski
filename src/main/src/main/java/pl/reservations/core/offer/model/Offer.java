package pl.reservations.core.offer.model;

import lombok.Getter;
import lombok.Setter;
import pl.reservations.core.employee.model.EmployeeOffer;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "offer")
public class Offer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @OneToMany(mappedBy = "offer")
    private List<EmployeeOffer> employeeOfferList;
}
