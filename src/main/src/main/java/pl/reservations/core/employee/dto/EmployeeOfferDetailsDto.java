package pl.reservations.core.employee.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
public class EmployeeOfferDetailsDto {

    private Long id;
    private Long employeeId;
    private Long offerId;
    private String title;
    private String description;
    private Float price;
    private String time;
    private String serviceName;
}
