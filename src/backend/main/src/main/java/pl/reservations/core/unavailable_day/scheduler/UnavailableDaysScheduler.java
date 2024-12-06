package pl.reservations.core.unavailable_day.scheduler;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import pl.reservations.core.unavailable_day.service.UnavailableDaysService;


@Service
public class UnavailableDaysScheduler {

    private final UnavailableDaysService unavailableDaysService;

    public UnavailableDaysScheduler(UnavailableDaysService unavailableDaysService) {
        this.unavailableDaysService = unavailableDaysService;
    }

    @Scheduled(cron = "4 5 14 * * ?")
    public void scheduleUnavailableDaysUpdate() {

        unavailableDaysService.updateUnavailableDays();
    }
}