package pl.reservations.core.employee.assembler;

import org.springframework.stereotype.Component;
import pl.reservations.core.employee.dto.EmployeeOfferDto;
import pl.reservations.core.employee.model.EmployeeOffer;

@Component
public class EmployeeOfferAssembler {


    public EmployeeOfferDto assemble(EmployeeOffer employeeOffer) {
        return EmployeeOfferDto
                .builder()
                .id(employeeOffer.getId())
                .title(employeeOffer.getOffer().getTitle())
                .description(employeeOffer.getOffer().getDescription())
                .offerId(employeeOffer.getOffer().getId())
                .employeeId(employeeOffer.getEmployee().getId())
                .price(employeeOffer.getPrice())
                .time(employeeOffer.getTime())
                .build();
    }
}
