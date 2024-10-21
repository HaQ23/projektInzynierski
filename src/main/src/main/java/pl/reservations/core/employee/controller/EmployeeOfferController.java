package pl.reservations.core.employee.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.reservations.core.employee.dto.EmployeeOfferDto;
import pl.reservations.core.employee.service.EmployeeOfferService;

@RestController
@RequestMapping("/api/employee/offer")
@RequiredArgsConstructor
public class EmployeeOfferController {

    private final EmployeeOfferService employeeOfferService;

    @PostMapping
    public EmployeeOfferDto addEmployeeOffer(@RequestBody EmployeeOfferDto employeeOfferDto) {
        return employeeOfferService.addEmployeeOffer(employeeOfferDto);
    }
}
