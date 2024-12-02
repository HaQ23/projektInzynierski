import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ModalService } from '../../../../shared/components/base-modal/modal.service';
import { Subject } from 'rxjs';
import { ModalBase } from '../../../../shared/components/base-modal/modal.base';
import { ReservationDto } from '../../../../shared/model/api-models';
import { UserService } from '../../../service/user.service';

@Component({
  selector: 'app-confirm-delete-visit-modal',
  templateUrl: './confirm-delete-visit-modal.component.html',
  styleUrl: './confirm-delete-visit-modal.component.scss',
})
export class ConfirmDeleteVisitModalComponent
  extends ModalBase
  implements OnInit
{
  @Output() reservationCancelled = new EventEmitter<void>();
  reservation!: ReservationDto;
  title: string = 'Potwierdź';
  constructor(
    private modalService: ModalService,
    private userService: UserService
  ) {
    super();
    this.subject = new Subject<string>();
    this.subject$ = this.subject.asObservable();
    this.subject$.subscribe({
      next: (reservation) => {
        this.reservation = reservation;
      },
    });
  }
  ngOnInit(): void {}

  closeModal(): void {
    this.modalService.close();
  }
  override nextConfirm(): void {
    if (this.reservation.id) {
      this.userService.cancelReservation(this.reservation.id).subscribe({
        next: () => {
          this.reservationCancelled.emit();
          this.modalService.close();
        },
        error: (err) => {
          console.error('Błąd podczas anulowania rezerwacji:', err);
          this.modalService.close();
        },
      });
    }
  }
  override nextReject(): void {
    this.modalService.close();
  }
}
