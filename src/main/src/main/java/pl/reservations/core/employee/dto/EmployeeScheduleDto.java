package pl.reservations.core.employee.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeScheduleDto {

    private Long employeeId;
    private String date;
    private String unavailableFrom;
    private int time;

}
