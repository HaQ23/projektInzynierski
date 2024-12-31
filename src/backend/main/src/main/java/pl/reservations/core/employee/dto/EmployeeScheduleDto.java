package pl.reservations.core.employee.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeScheduleDto {

    private Long employeeId;
    private LocalDate date;
    private String unavailableFrom;
    private int time;

}
