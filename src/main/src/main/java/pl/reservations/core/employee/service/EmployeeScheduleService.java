package pl.reservations.core.employee.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.reservations.core.employee.model.Employee;
import pl.reservations.core.employee.model.EmployeeSchedule;
import pl.reservations.core.employee.dto.EmployeeScheduleDto;
import pl.reservations.core.employee.repository.EmployeeRepository;
import pl.reservations.core.employee.repository.EmployeeScheduleRepository;

import javax.transaction.Transactional;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class EmployeeScheduleService {

    private final EmployeeScheduleRepository employeeScheduleRepository;
    private final EmployeeRepository employeeRepository;
    private static final LocalTime START_TIME = LocalTime.of(8, 0);
    private static final LocalTime END_TIME = LocalTime.of(16, 0);


    public void addEmployeeSchedule(EmployeeScheduleDto employeeScheduleDto) {
        Employee employee = employeeRepository.findById(employeeScheduleDto.getEmployeeId()).orElse(null);
        EmployeeSchedule employeeSchedule = new EmployeeSchedule();

        employeeSchedule.setEmployee(employee);
        employeeSchedule.setDate(employeeScheduleDto.getDate());
        employeeSchedule.setTime(employeeScheduleDto.getTime());
        employeeSchedule.setUnavailableFrom(employeeScheduleDto.getUnavailableFrom());
        employeeScheduleRepository.save(employeeSchedule);
    }

    public List<LocalTime> getAvailableTimeSlotsForDate(Long id,String date) {
        List<LocalTime> allTimeSlots = generateAllTimeSlots();
        List<LocalTime> bookedTimeSlots = getUnavailableTimeSlotsForDate(id, date);
        removeBookedTimeSlots(allTimeSlots, bookedTimeSlots);
        return allTimeSlots;
    }

    private List<LocalTime> generateAllTimeSlots() {
        List<LocalTime> allTimeSlots = new ArrayList<>();
        LocalTime currentTime = START_TIME;
        while (currentTime.isBefore(END_TIME)) {
            allTimeSlots.add(currentTime);
            currentTime = currentTime.plusMinutes(10);
        }
        return allTimeSlots;
    }

    private List<LocalTime> getUnavailableTimeSlotsForDate(Long employeeId, String date) {
        List<LocalTime> unavailableTimeSlots = new ArrayList<>();
        List<EmployeeSchedule> schedules = this.employeeScheduleRepository.findByDateAndEmployeeId(date, employeeId);
        for (EmployeeSchedule schedule : schedules) {
            LocalTime unavailableFrom = LocalTime.parse(schedule.getUnavailableFrom());
            int duration = schedule.getTime();
            LocalTime unavailableUntil = unavailableFrom.plusMinutes(duration);
            while (unavailableFrom.isBefore(unavailableUntil)) {
                unavailableTimeSlots.add(unavailableFrom);
                unavailableFrom = unavailableFrom.plusMinutes(10);
            }
        }
        return unavailableTimeSlots;
    }

    private void removeBookedTimeSlots(List<LocalTime> allTimeSlots, List<LocalTime> bookedTimeSlots) {
        allTimeSlots.removeAll(bookedTimeSlots);
    }
}
