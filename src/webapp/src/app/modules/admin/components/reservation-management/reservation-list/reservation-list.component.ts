import { Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ReservationDetailsDto } from '../../../../shared/model/api-models';
import { AdminService } from '../../../service/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModalService } from '../../../../shared/components/base-modal/modal.service';
import { ConfirmModalComponent } from '../../../../shared/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.scss'],
})
export class ReservationListComponent {
  @Input() reservations: ReservationDetailsDto[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = [
    'offer',
    'date',
    'time',
    'user',
    'status',
    'actions',
  ];

  dataSource = new MatTableDataSource<ReservationDetailsDto>([]);

  constructor(
    private adminService: AdminService,
    private snackBar: MatSnackBar,
    private modalService: ModalService
  ) {}

  ngOnChanges(): void {
    this.dataSource.data = this.reservations;
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  deleteReservation(reservationId: number): void {
    const confirmModalRef = this.modalService.openModal(ConfirmModalComponent);
    confirmModalRef.componentRef.instance.message =
      'Czy na pewno chcesz usunąć tę rezerwację?';
    confirmModalRef.subject$.subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.adminService.deleteReservation(reservationId).subscribe({
          next: () => {
            this.snackBar.open('Rezerwacja została usunięta', 'Zamknij', {
              duration: 3000,
            });
            this.reservations = this.reservations.filter(
              (reservation) => reservation.id !== reservationId
            );
            this.dataSource.data = this.reservations;
          },
          error: () => {
            this.snackBar.open('Nie udało się usunąć rezerwacji', 'Zamknij', {
              duration: 3000,
            });
          },
        });
      }
    });
  }

  cancelReservation(reservationId: number): void {
    const reservation = this.reservations.find(
      (res) => res.id === reservationId
    );
    if (reservation?.status !== 'oczekujaca') {
      this.snackBar.open(
        `Nie możesz anulować rezerwacji o statusie ${reservation?.status}`,
        'Zamknij',
        { duration: 3000, panelClass: ['snackbar-error'] }
      );
      return;
    }

    const confirmModalRef = this.modalService.openModal(ConfirmModalComponent);
    confirmModalRef.componentRef.instance.message =
      'Czy na pewno chcesz anulować tę rezerwację?';
    confirmModalRef.subject$.subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.adminService.cancelReservationByAdmin(reservationId).subscribe({
          next: () => {
            this.snackBar.open('Rezerwacja została anulowana', 'Zamknij', {
              duration: 3000,
            });
            if (reservation) {
              reservation.status = 'anulowana';
            }
            this.dataSource.data = [...this.reservations];
          },
          error: () => {
            this.snackBar.open('Nie udało się anulować rezerwacji', 'Zamknij', {
              duration: 3000,
            });
          },
        });
      }
    });
  }

  getReservationTimeRange(reservation: ReservationDetailsDto): string {
    const startTime = reservation.reservationTime;
    const duration = reservation.duration;

    const [hours, minutes] = startTime.split(':').map(Number);
    const startDate = new Date();
    startDate.setHours(hours, minutes, 0);

    const endDate = new Date(startDate.getTime() + duration * 60000);

    const endHours = endDate.getHours().toString().padStart(2, '0');
    const endMinutes = endDate.getMinutes().toString().padStart(2, '0');

    return `${startTime} - ${endHours}:${endMinutes}`;
  }
}
