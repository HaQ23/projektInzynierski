import { Component, OnInit, OnDestroy } from '@angular/core';
import { EmployeeDto } from '../shared/model/api-models';
import { EmployeeService } from './services/employee.service';
import { BaseComponent } from '../shared/base/base.component';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss',
})
export class ServicesComponent extends BaseComponent implements OnInit {
  employees: EmployeeDto[] = [];

  constructor(private employeeService: EmployeeService) {
    super();
  }

  ngOnInit(): void {
    this.asyncRequest(this.employeeService.getAllEmployees()).subscribe(
      (data: EmployeeDto[]) => {
        this.employees = data;
      }
    );
  }
}
