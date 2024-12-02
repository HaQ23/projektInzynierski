import { Component, Input, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {
  EmployeeDetailsDto,
  EmployeeDetailsRequest,
} from '../../../../shared/model/api-models';
import { AdminService } from '../../../service/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModalService } from '../../../../shared/components/base-modal/modal.service';
import { EmployeeFormModalComponent } from '../employee-form-modal/employee-form-modal.component';
import { ConfirmModalComponent } from '../../../../shared/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
})
export class EmployeeListComponent implements OnInit {
  @Input() employees: EmployeeDetailsDto[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'phoneNumber',
    'actions',
  ];
  dataSource = new MatTableDataSource<EmployeeDetailsDto>([]);
  selectedSort: string = '';

  constructor(
    private adminService: AdminService,
    private snackBar: MatSnackBar,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.dataSource.data = this.employees;
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  ngOnChanges(): void {
    this.dataSource.data = this.employees;
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  deleteEmployee(employeeId: number): void {
    const confirmModalRef = this.modalService.openModal(ConfirmModalComponent);
    confirmModalRef.componentRef.instance.message =
      'Czy na pewno chcesz usunąć tego pracownika?';
    confirmModalRef.subject$.subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.adminService.deleteEmployee(employeeId).subscribe({
          next: () => {
            this.snackBar.open('Pracownik został usunięty', 'Zamknij', {
              duration: 3000,
            });
            this.employees = this.employees.filter(
              (employee) => employee.id !== employeeId
            );
            this.dataSource.data = [...this.employees];
          },
          error: () => {
            this.snackBar.open('Nie udało się usunąć pracownika', 'Zamknij', {
              duration: 3000,
              panelClass: ['snackbar-error'],
            });
          },
        });
      }
    });
  }

  editEmployee(employee: EmployeeDetailsDto): void {
    const employeeFormModalRef = this.modalService.openModal(
      EmployeeFormModalComponent
    );
    employeeFormModalRef.componentRef.instance.employee = { ...employee };
    employeeFormModalRef.subject$.subscribe(
      (updatedEmployee: EmployeeDetailsDto) => {
        if (updatedEmployee) {
          this.adminService.updateEmployee(updatedEmployee).subscribe({
            next: (response: EmployeeDetailsDto) => {
              const index = this.employees.findIndex(
                (e) => e.id === response.id
              );
              if (index !== -1) {
                this.employees[index] = response;
                this.dataSource.data = [...this.employees];
              }
              this.snackBar.open('Pracownik został zaktualizowany', 'Zamknij', {
                duration: 3000,
              });
            },
            error: () => {
              this.snackBar.open(
                'Nie udało się zaktualizować pracownika',
                'Zamknij',
                {
                  duration: 3000,
                  panelClass: ['snackbar-error'],
                }
              );
            },
          });
        }
      }
    );
  }

  addEmployee(): void {
    const employeeFormModalRef = this.modalService.openModal(
      EmployeeFormModalComponent
    );
    employeeFormModalRef.subject$.subscribe(
      (newEmployee: EmployeeDetailsRequest) => {
        if (newEmployee) {
          this.adminService.addEmployee(newEmployee).subscribe({
            next: (createdEmployee) => {
              this.employees.push(createdEmployee);
              this.dataSource.data = [...this.employees];
              this.snackBar.open('Pracownik został dodany', 'Zamknij', {
                duration: 3000,
              });
            },
            error: () => {
              this.snackBar.open('Nie udało się dodać pracownika', 'Zamknij', {
                duration: 3000,
                panelClass: ['snackbar-error'],
              });
            },
          });
        }
      }
    );
  }

  sortEmployees(): void {
    switch (this.selectedSort) {
      case 'firstName':
        this.dataSource.data = this.employees.sort((a, b) =>
          a.firstName.localeCompare(b.firstName)
        );
        break;
      case 'lastName':
        this.dataSource.data = this.employees.sort((a, b) =>
          a.lastName.localeCompare(b.lastName)
        );
        break;
    }
  }
}
