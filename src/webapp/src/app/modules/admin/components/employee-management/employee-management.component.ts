import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from '../../service/admin.service';
import { EmployeeDetailsDto } from '../../../shared/model/api-models';
import { ModalService } from '../../../shared/components/base-modal/modal.service';

@Component({
  selector: 'app-employee-management',
  templateUrl: './employee-management.component.html',
  styleUrls: ['./employee-management.component.scss'],
})
export class EmployeeManagementComponent implements OnInit {
  employees: EmployeeDetailsDto[] = [];

  constructor(
    private adminService: AdminService,
    private snackBar: MatSnackBar,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.adminService.getEmployeesDetails().subscribe({
      next: (employees) => {
        this.employees = employees;
      },
      error: () => {
        this.snackBar.open(
          'Nie udało się pobrać listy pracowników',
          'Zamknij',
          {
            duration: 3000,
            panelClass: ['snackbar-error'],
          }
        );
      },
    });
  }

  onEmployeeDeleted(): void {
    this.loadEmployees();
  }
}
