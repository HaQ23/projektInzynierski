package pl.reservations.core.employee.assembler;

import org.springframework.stereotype.Component;
import pl.reservations.core.employee.dto.EmployeeOfferDetailsDto;
import pl.reservations.core.employee.model.EmployeeOffer;

@Component
public class EmployeeOfferDetailsAssembler {

    public EmployeeOfferDetailsDto assemble(EmployeeOffer employeeOffer) {
        return EmployeeOfferDetailsDto.builder()
                .id(employeeOffer.getId())
                .employeeId(employeeOffer.getEmployee().getId())
                .offerId(employeeOffer.getOffer().getId())
                .title(employeeOffer.getOffer().getTitle())
                .description(employeeOffer.getOffer().getDescription())
                .price(employeeOffer.getPrice())
                .time(employeeOffer.getTime())
                .serviceName(employeeOffer.getOffer().getTitle())
                .build();
    }
}
