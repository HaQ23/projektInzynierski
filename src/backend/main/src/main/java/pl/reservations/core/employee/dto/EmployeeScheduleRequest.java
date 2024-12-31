package pl.reservations.core.employee.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class EmployeeScheduleRequest {
    private Long employeeId;
    private LocalDate date;
    private int serviceDurationMinutes;
}
