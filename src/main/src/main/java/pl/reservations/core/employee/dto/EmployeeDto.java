package pl.reservations.core.employee.dto;

import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
public class EmployeeDto {


    private Long id;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private List<EmployeeOfferDto> employeeOfferList;
}
