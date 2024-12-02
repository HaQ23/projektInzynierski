package pl.reservations.core.unavailable_day.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.reservations.core.unavailable_day.dto.UnavailableDayDto;
import pl.reservations.core.unavailable_day.model.UnavailableDay;
import pl.reservations.core.unavailable_day.repository.UnavailableDaysRepository;

import javax.transaction.Transactional;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class UnavailableDaysService {

    private final UnavailableDaysRepository unavailableDaysRepository;

    public List<UnavailableDayDto> getUnavailableDays() {
        return unavailableDaysRepository.findAll().stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public UnavailableDayDto addUnavailableDay(UnavailableDayDto unavailableDayDto) {
        UnavailableDay unavailableDay = new UnavailableDay();
        unavailableDay.setDate(unavailableDayDto.getDate());
        unavailableDay.setReason(unavailableDayDto.getReason());
        unavailableDay.setRecurring(unavailableDayDto.isRecurring());
        unavailableDaysRepository.save(unavailableDay);
        return toDto(unavailableDay);
    }

    public void updateUnavailableDays() {
        LocalDate today = LocalDate.now();
        LocalDate nextMonth = today.plusMonths(2);

        for (LocalDate date = today; date.isBefore(nextMonth); date = date.plusDays(1)) {
            if (date.getDayOfWeek().equals(DayOfWeek.SUNDAY)) {
                if (!unavailableDaysRepository.existsByDate(date)) {
                    UnavailableDay sunday = new UnavailableDay();
                    sunday.setDate(date);
                    sunday.setReason("Niedziela");
                    sunday.setRecurring(false);
                    unavailableDaysRepository.save(sunday);
                }
            }
        }

        // Usuń przeszłe dni
        unavailableDaysRepository.deleteByDateBefore(today);
    }

    public boolean isDateUnavailable(LocalDate date) {
        return unavailableDaysRepository.existsByDate(date);
    }

    private UnavailableDayDto toDto(UnavailableDay unavailableDay) {
        return new UnavailableDayDto(unavailableDay.getId(), unavailableDay.getDate(), unavailableDay.getReason(), unavailableDay.isRecurring());
    }
}
