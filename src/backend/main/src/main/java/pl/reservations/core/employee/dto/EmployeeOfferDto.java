package pl.reservations.core.employee.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
public class EmployeeOfferDto {

    private Long id;
    private Long offerId;
    private Long employeeId;
    private String title;
    private String description;
    private Float price;
    private String time;
}
