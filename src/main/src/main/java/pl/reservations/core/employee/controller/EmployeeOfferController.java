package pl.reservations.core.employee.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import pl.reservations.core.employee.dto.EmployeeOfferDetailsDto;
import pl.reservations.core.employee.dto.EmployeeOfferDto;
import pl.reservations.core.employee.service.EmployeeOfferService;
import pl.reservations.core.offer.model.Offer;

import java.util.List;

@RestController
@RequestMapping("/api/employee/offer")
@RequiredArgsConstructor
public class EmployeeOfferController {

    private final EmployeeOfferService employeeOfferService;

    @PostMapping
    public EmployeeOfferDto addEmployeeOffer(@RequestBody EmployeeOfferDto employeeOfferDto) {
        return employeeOfferService.addEmployeeOffer(employeeOfferDto);
    }

    @GetMapping("/{employeeId}/details")
    public List<EmployeeOfferDetailsDto> getEmployeeOffers(@PathVariable Long employeeId) {
        return employeeOfferService.getEmployeeOffers(employeeId);
    }

    @DeleteMapping("/{id}")
    public void deleteEmployeeOffer(@PathVariable Long id) {
        employeeOfferService.deleteEmployeeOffer(id);
    }

    @PutMapping("/{id}")
    public EmployeeOfferDto updateEmployeeOffer(@PathVariable Long id, @RequestBody EmployeeOfferDto employeeOfferDto) {
        return employeeOfferService.updateEmployeeOffer(id, employeeOfferDto);
    }
    @GetMapping("/{employeeId}/available-offers")
    public List<Offer> getAvailableOffersForEmployee(@PathVariable Long employeeId) {
        return employeeOfferService.getAvailableOffersForEmployee(employeeId);
    }
}
