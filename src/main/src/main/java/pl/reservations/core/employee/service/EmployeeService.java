package pl.reservations.core.employee.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.reservations.core.employee.assembler.EmployeeAssembler;
import pl.reservations.core.employee.dto.EmployeeDto;
import pl.reservations.core.employee.dto.EmployeeDetailsDto;
import pl.reservations.core.employee.model.Employee;
import pl.reservations.core.employee.repository.EmployeeRepository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final EmployeeAssembler employeeAssembler;

    public List<EmployeeDto> getEmployeeList() {
        return employeeRepository.findAll()
                .stream()
                .map(employeeAssembler::assemble)
                .collect(Collectors.toList());
    }

    public List<EmployeeDetailsDto> getEmployeeDetailsList() {
        return employeeRepository.findAll()
                .stream()
                .map(this::mapToDetailsDto)
                .collect(Collectors.toList());
    }

    public EmployeeDto getEmployee(Long id) {
        Employee employee = employeeRepository.findById(id).orElseThrow(() ->
                new IllegalArgumentException("Employee not found"));
        return employeeAssembler.assemble(employee);
    }

    public EmployeeDto addEmployee(EmployeeDto employeeDto) {
        Employee employee = new Employee();
        employee.setFirstName(employeeDto.getFirstName());
        employee.setLastName(employeeDto.getLastName());
        employee.setPhoneNumber(employeeDto.getPhoneNumber());
        employeeRepository.save(employee);
        return employeeAssembler.assemble(employee);
    }

    public EmployeeDto updateEmployee(Long id, EmployeeDto employeeDto) {
        Employee employee = employeeRepository.findById(id).orElseThrow(() ->
                new IllegalArgumentException("Employee not found"));
        employee.setFirstName(employeeDto.getFirstName());
        employee.setLastName(employeeDto.getLastName());
        employee.setPhoneNumber(employeeDto.getPhoneNumber());
        employeeRepository.save(employee);
        return employeeAssembler.assemble(employee);
    }

    public void deleteEmployee(Long id) {
        employeeRepository.deleteById(id);
    }

    private EmployeeDetailsDto mapToDetailsDto(Employee employee) {
        return EmployeeDetailsDto.builder()
                .id(employee.getId())
                .firstName(employee.getFirstName())
                .lastName(employee.getLastName())
                .phoneNumber(employee.getPhoneNumber())
                .build();
    }
}
