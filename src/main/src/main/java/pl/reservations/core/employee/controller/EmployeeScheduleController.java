package pl.reservations.core.employee.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.reservations.core.employee.dto.EmployeeOfferDto;
import pl.reservations.core.employee.dto.EmployeeScheduleDto;
import pl.reservations.core.employee.service.EmployeeScheduleService;

import java.time.LocalTime;
import java.util.List;

@RestController
@RequestMapping("/api/employee/schedule")
@RequiredArgsConstructor
public class EmployeeScheduleController {


    private final EmployeeScheduleService employeeScheduleService;

    @GetMapping
    public List<LocalTime> getEmployeeSchedule(@RequestParam("id") Long id, @RequestParam("date") String date) {
        return this.employeeScheduleService.getAvailableTimeSlotsForDate(id,date);
    }
    @PostMapping
    public String addEmployeeSchedule(@RequestBody EmployeeScheduleDto employeeScheduleDto) {
        this.employeeScheduleService.addEmployeeSchedule(employeeScheduleDto);
        return  "Employee Schedule Added";
    }
}
