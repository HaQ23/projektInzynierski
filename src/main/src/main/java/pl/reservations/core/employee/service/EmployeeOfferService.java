package pl.reservations.core.employee.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.reservations.core.employee.assembler.EmployeeOfferAssembler;
import pl.reservations.core.employee.dto.EmployeeOfferDto;
import pl.reservations.core.employee.model.Employee;
import pl.reservations.core.employee.model.EmployeeOffer;
import pl.reservations.core.employee.repository.EmployeeOfferRepository;
import pl.reservations.core.employee.repository.EmployeeRepository;
import pl.reservations.core.offer.model.Offer;
import pl.reservations.core.offer.repository.OfferRepository;

@Service
@RequiredArgsConstructor
public class EmployeeOfferService {

    private final EmployeeOfferRepository employeeOfferRepository;
    private final EmployeeRepository employeeRepository;
    private final OfferRepository offerRepository;
    private final EmployeeOfferAssembler employeeOfferAssembler;

    public EmployeeOfferDto addEmployeeOffer(EmployeeOfferDto employeeOfferDto) {
        Employee employee = this.employeeRepository.findById(employeeOfferDto.getEmployeeId()).orElse(null);
        Offer offer = this.offerRepository.findById(employeeOfferDto.getOfferId()).orElse(null);
        EmployeeOffer employeeOffer = new EmployeeOffer();

        employeeOffer.setEmployee(employee);
        employeeOffer.setOffer(offer);
        employeeOffer.setPrice(employeeOfferDto.getPrice());
        employeeOffer.setTime(employeeOfferDto.getTime());

        employeeOfferRepository.save(employeeOffer);

        return employeeOfferAssembler.assemble(employeeOffer);
    }
}
