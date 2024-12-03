import { Component, OnInit, OnDestroy } from '@angular/core';
import { EmployeeDto } from '../shared/model/api-models';
import { EmployeeService } from './services/employee.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss',
})
export class ServicesComponent implements OnInit {
  private sub!: Subscription;
  constructor(private employeeService: EmployeeService) {}
  ngOnInit(): void {
    this.employeeService.getAllEmployees().subscribe();
    this.sub = this.employeeService.employeeList.subscribe(
      (data: EmployeeDto[]) => {
        this.employees = data;
      }
    );
  }
  employees: EmployeeDto[] = [];

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
