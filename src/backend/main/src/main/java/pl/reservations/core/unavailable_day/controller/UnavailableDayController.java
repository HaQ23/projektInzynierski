package pl.reservations.core.unavailable_day.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.reservations.core.unavailable_day.dto.UnavailableDayDto;
import pl.reservations.core.unavailable_day.service.UnavailableDaysService;

import java.util.List;

@RestController
@RequestMapping("/api/unavailable-days")
@RequiredArgsConstructor
public class UnavailableDayController {

    private final UnavailableDaysService unavailableDaysService;

    @GetMapping
    public ResponseEntity<List<UnavailableDayDto>> getUnavailableDays() {
        return ResponseEntity.ok(unavailableDaysService.getUnavailableDays());
    }

    @PostMapping
    public ResponseEntity<UnavailableDayDto> addUnavailableDay(@RequestBody UnavailableDayDto unavailableDayDto) {
        return ResponseEntity.ok(unavailableDaysService.addUnavailableDay(unavailableDayDto));
    }

    @PostMapping("/update")
    public ResponseEntity<Void> updateUnavailableDays() {
        unavailableDaysService.updateUnavailableDays();
        return ResponseEntity.noContent().build();
    }
}
