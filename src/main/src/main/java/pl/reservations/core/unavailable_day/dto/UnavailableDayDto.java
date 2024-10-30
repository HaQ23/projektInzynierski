package pl.reservations.core.unavailable_day.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UnavailableDayDto {
    private Long id;
    private LocalDate date;
    private String reason;
    private boolean recurring;
}
