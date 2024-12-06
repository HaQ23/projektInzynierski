package pl.reservations.core.employee.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.reservations.core.employee.assembler.EmployeeOfferAssembler;
import pl.reservations.core.employee.assembler.EmployeeOfferDetailsAssembler;
import pl.reservations.core.employee.dto.EmployeeOfferDetailsDto;
import pl.reservations.core.employee.dto.EmployeeOfferDto;
import pl.reservations.core.employee.model.Employee;
import pl.reservations.core.employee.model.EmployeeOffer;
import pl.reservations.core.employee.repository.EmployeeOfferRepository;
import pl.reservations.core.employee.repository.EmployeeRepository;
import pl.reservations.core.offer.model.Offer;
import pl.reservations.core.offer.repository.OfferRepository;

import jakarta.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class EmployeeOfferService {

    private final EmployeeOfferRepository employeeOfferRepository;
    private final EmployeeRepository employeeRepository;
    private final OfferRepository offerRepository;
    private final EmployeeOfferAssembler employeeOfferAssembler;
    private final EmployeeOfferDetailsAssembler employeeOfferDetailsAssembler;


    public EmployeeOfferDto addEmployeeOffer(EmployeeOfferDto employeeOfferDto) {
        Employee employee = employeeRepository.findById(employeeOfferDto.getEmployeeId())
                .orElseThrow(() -> new IllegalArgumentException("Nie znaleziono pracownika"));
        Offer offer = offerRepository.findById(employeeOfferDto.getOfferId())
                .orElseThrow(() -> new IllegalArgumentException("Nie znaleziono oferty"));

        EmployeeOffer employeeOffer = new EmployeeOffer();
        employeeOffer.setEmployee(employee);
        employeeOffer.setOffer(offer);
        employeeOffer.setPrice(employeeOfferDto.getPrice());
        employeeOffer.setTime(employeeOfferDto.getTime());

        employeeOfferRepository.save(employeeOffer);
        return employeeOfferAssembler.assemble(employeeOffer);
    }


    public List<EmployeeOfferDetailsDto> getEmployeeOffers(Long employeeId) {
        List<EmployeeOffer> employeeOffers = employeeOfferRepository.findByEmployeeId(employeeId);
        return employeeOffers.stream()
                .map(employeeOfferDetailsAssembler::assemble)
                .collect(Collectors.toList());
    }


    public void deleteEmployeeOffer(Long id) {
        employeeOfferRepository.deleteById(id);
    }


    public EmployeeOfferDto updateEmployeeOffer(Long id, EmployeeOfferDto employeeOfferDto) {
        EmployeeOffer employeeOffer = employeeOfferRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Nie znaleziono oferty"));

        employeeOffer.setPrice(employeeOfferDto.getPrice());
        employeeOffer.setTime(employeeOfferDto.getTime());

        employeeOfferRepository.save(employeeOffer);
        return employeeOfferAssembler.assemble(employeeOffer);
    }
    public List<Offer> getAvailableOffersForEmployee(Long employeeId) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new IllegalArgumentException("Nie znaleziono pracownika"));


        List<EmployeeOffer> assignedOffers = employeeOfferRepository.findByEmployeeId(employeeId);
        List<Long> assignedOfferIds = assignedOffers.stream()
                .map(employeeOffer -> employeeOffer.getOffer().getId())
                .collect(Collectors.toList());


        return offerRepository.findAll().stream()
                .filter(offer -> !assignedOfferIds.contains(offer.getId()))
                .collect(Collectors.toList());
    }

}
