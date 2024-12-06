package pl.reservations.core.employee.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.reservations.core.employee.dto.EmployeeScheduleDto;
import pl.reservations.core.employee.dto.EmployeeScheduleRequest;
import pl.reservations.core.employee.service.EmployeeScheduleService;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/employee/schedule")
@RequiredArgsConstructor
public class EmployeeScheduleController {

    private final EmployeeScheduleService employeeScheduleService;

    @PostMapping("/available-slots")
    public ResponseEntity<List<String>> getEmployeeSchedule(@RequestBody EmployeeScheduleRequest request) {
        List<String> availableSlots = this.employeeScheduleService.getAvailableTimeSlotsForDate(
                request.getEmployeeId(),
                request.getDate(),
                request.getServiceDurationMinutes()
        );
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(availableSlots);
    }

    @GetMapping("/available-days")
    public ResponseEntity<List<LocalDate>> getAvailableDays(
            @RequestParam Long employeeId) {
        List<LocalDate> availableDays = employeeScheduleService.getAvailableDaysForNextTwoMonths(employeeId);
        return ResponseEntity.ok(availableDays);
    }

    @PostMapping
    public ResponseEntity<Map<String, String>> addEmployeeSchedule(@RequestBody EmployeeScheduleDto employeeScheduleDto) {
        this.employeeScheduleService.addEmployeeSchedule(employeeScheduleDto);
        return ResponseEntity.ok(Map.of("message", "Employee Schedule Added"));
    }
}
