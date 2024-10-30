package pl.reservations.core.employee.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EmployeeScheduleRequest {
    private Long employeeId;
    private String date;
    private int serviceDurationMinutes;
}
