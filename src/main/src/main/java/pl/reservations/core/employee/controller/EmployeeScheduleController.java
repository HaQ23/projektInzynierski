package pl.reservations.core.employee.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.reservations.core.employee.dto.EmployeeScheduleDto;
import pl.reservations.core.employee.dto.EmployeeScheduleRequest;
import pl.reservations.core.employee.service.EmployeeScheduleService;

import java.time.LocalTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/employee/schedule")
@RequiredArgsConstructor
public class EmployeeScheduleController {

    private final EmployeeScheduleService employeeScheduleService;

    @PostMapping("/available-slots")
    public ResponseEntity<List<LocalTime>> getEmployeeSchedule(@RequestBody EmployeeScheduleRequest request) {
        List<LocalTime> availableSlots = this.employeeScheduleService.getAvailableTimeSlotsForDate(
                request.getEmployeeId(),
                request.getDate(),
                request.getServiceDurationMinutes()
        );
        return ResponseEntity.ok(availableSlots);
    }


    @PostMapping
    public ResponseEntity<Map<String, String>> addEmployeeSchedule(@RequestBody EmployeeScheduleDto employeeScheduleDto) {
        this.employeeScheduleService.addEmployeeSchedule(employeeScheduleDto);
        return ResponseEntity.ok(Map.of("message", "Employee Schedule Added"));
    }
}
