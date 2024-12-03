import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from '../../service/admin.service';
import {
  EmployeeDto,
  ReservationDetailsDto,
} from '../../../shared/model/api-models';

@Component({
  selector: 'app-reservation-management',
  templateUrl: './reservation-management.component.html',
  styleUrls: ['./reservation-management.component.scss'],
})
export class ReservationManagementComponent implements OnInit {
  reservations: ReservationDetailsDto[] = [];
  employees: EmployeeDto[] = [];
  filteredReservations = new MatTableDataSource<ReservationDetailsDto>([]);

  selectedEmployeeId: number | null = null;
  selectedDate: Date | null = new Date();
  startDate: Date | null = null;
  endDate: Date | null = null;
  filterOption: string = 'specificDay';
  selectedStatus: string = '';
  clientSearch: string = '';
  offerSearch: string = '';

  constructor(
    private adminService: AdminService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(): void {
    this.adminService.getEmployees().subscribe({
      next: (employees) => {
        this.employees = employees;
        if (employees.length > 0) {
          this.selectedEmployeeId = employees[0].id;
          this.fetchReservationsForEmployee();
        }
      },
      error: () => {
        this.snackBar.open('Nie udało się pobrać pracowników', 'Zamknij', {
          duration: 3000,
          panelClass: ['snackbar-error'],
        });
      },
    });
  }

  fetchReservationsForEmployee(): void {
    if (this.selectedEmployeeId !== null) {
      if (this.filterOption === 'all') {
        this.adminService
          .getAllReservationsForEmployee(this.selectedEmployeeId)
          .subscribe({
            next: (reservations) => {
              this.reservations = reservations;
              this.sortReservationsByDate();
              this.applyFilters();
            },
            error: () => {
              this.snackBar.open('Nie udało się pobrać rezerwacji', 'Zamknij', {
                duration: 3000,
                panelClass: ['snackbar-error'],
              });
            },
          });
      } else if (this.filterOption === 'specificDay' && this.selectedDate) {
        const startDate = this.formatDateToLocalString(this.selectedDate);
        const endDate = startDate;

        this.adminService
          .getReservationsForEmployeeWithDateRange(
            this.selectedEmployeeId,
            startDate,
            endDate
          )
          .subscribe({
            next: (reservations) => {
              this.reservations = reservations;
              this.sortReservationsByDate();
              this.applyFilters();
            },
            error: () => {
              this.snackBar.open('Nie udało się pobrać rezerwacji', 'Zamknij', {
                duration: 3000,
                panelClass: ['snackbar-error'],
              });
            },
          });
      } else if (
        this.filterOption === 'dateRange' &&
        this.startDate &&
        this.endDate
      ) {
        const startDate = this.formatDateToLocalString(this.startDate);
        const endDate = this.formatDateToLocalString(this.endDate);

        this.adminService
          .getReservationsForEmployeeWithDateRange(
            this.selectedEmployeeId,
            startDate,
            endDate
          )
          .subscribe({
            next: (reservations) => {
              this.reservations = reservations;
              this.sortReservationsByDate();
              this.applyFilters();
            },
            error: () => {
              this.snackBar.open('Nie udało się pobrać rezerwacji', 'Zamknij', {
                duration: 3000,
                panelClass: ['snackbar-error'],
              });
            },
          });
      }
    }
  }

  formatDateToLocalString(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  sortReservationsByDate(): void {
    this.reservations.sort(
      (a, b) =>
        new Date(b.reservationDate).getTime() -
        new Date(a.reservationDate).getTime()
    );
  }

  onDateChange(): void {
    if (this.filterOption === 'specificDay' && this.selectedDate) {
      this.fetchReservationsForEmployee();
    }
  }

  onDateRangeChange(): void {
    if (this.filterOption === 'dateRange' && this.startDate && this.endDate) {
      this.fetchReservationsForEmployee();
    }
  }

  onFilterOptionChange(): void {
    this.fetchReservationsForEmployee();
  }

  applyFilters(): void {
    let filteredData = this.reservations;

    if (this.selectedStatus) {
      filteredData = filteredData.filter(
        (reservation) => reservation.status === this.selectedStatus
      );
    }

    if (this.clientSearch) {
      const searchLower = this.clientSearch.toLowerCase();
      filteredData = filteredData.filter(
        (reservation) =>
          (reservation.userFirstName?.toLowerCase() ?? '').includes(
            searchLower
          ) ||
          (reservation.userLastName?.toLowerCase() ?? '').includes(searchLower)
      );
    }

    if (this.offerSearch) {
      const offerLower = this.offerSearch.toLowerCase();
      filteredData = filteredData.filter((reservation) =>
        reservation.offerName?.toLowerCase().includes(offerLower)
      );
    }

    this.filteredReservations.data = filteredData;
  }
}
