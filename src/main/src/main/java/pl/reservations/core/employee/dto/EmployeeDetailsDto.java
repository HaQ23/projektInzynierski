package pl.reservations.core.employee.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class EmployeeDetailsDto {
    private Long id;
    private String firstName;
    private String lastName;
    private String phoneNumber;
}
