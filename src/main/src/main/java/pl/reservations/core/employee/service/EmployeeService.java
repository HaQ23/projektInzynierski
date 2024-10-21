package pl.reservations.core.employee.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.reservations.core.employee.assembler.EmployeeAssembler;
import pl.reservations.core.employee.dto.EmployeeDto;
import pl.reservations.core.employee.model.Employee;
import pl.reservations.core.employee.repository.EmployeeRepository;

import java.util.List;
import java.util.stream.Collectors;
@Service
@RequiredArgsConstructor
public class EmployeeService {
    private final EmployeeRepository employeeRepository;
    private final EmployeeAssembler employeeAssembler;
    public List<EmployeeDto> getEmployeeList() {
        return employeeRepository
                .findAll()
                .stream()
                .map(employeeAssembler::assemble)
                .collect(Collectors.toList());
    }
    public EmployeeDto getEmployee(Long id) {
        Employee employee = this.employeeRepository.findById(id).orElse(null);
        return this.employeeAssembler.assemble(employee);
    }
    public EmployeeDto addEmployee(EmployeeDto employeeDto) {
        Employee employee = new Employee();
        employee.setFirstName(employeeDto.getFirstName());
        employee.setLastName(employeeDto.getLastName());
        employee.setPhoneNumber(employeeDto.getPhoneNumber());
        employeeRepository.save(employee);
        return employeeAssembler.assemble(employee);
    }
}
