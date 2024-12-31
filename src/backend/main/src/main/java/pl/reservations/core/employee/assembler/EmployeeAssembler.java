package pl.reservations.core.employee.assembler;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.reservations.core.employee.dto.EmployeeDto;
import pl.reservations.core.employee.dto.EmployeeOfferDto;
import pl.reservations.core.employee.model.Employee;
import pl.reservations.core.employee.model.EmployeeOffer;

import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class EmployeeAssembler {

    private final EmployeeOfferAssembler employeeOfferAssembler;
    public EmployeeDto assemble(Employee employee) {
        return EmployeeDto
                .builder()
                .id(employee.getId())
                .firstName(employee.getFirstName())
                .lastName(employee.getLastName())
                .phoneNumber(employee.getPhoneNumber())
                .employeeOfferList(mapEmployeeOfferList(employee.getEmployeeOfferList()))
                .build();
    }
    private List<EmployeeOfferDto> mapEmployeeOfferList(List<EmployeeOffer> employeeOfferList) {
        if(employeeOfferList == null) {
            return null;
        }
        List<EmployeeOfferDto> employeeOfferDtoList = new ArrayList<>();

        for (EmployeeOffer employeeOffer : employeeOfferList) {
            employeeOfferDtoList.add(employeeOfferAssembler.assemble(employeeOffer));
        }

        return employeeOfferDtoList;
    }
}
