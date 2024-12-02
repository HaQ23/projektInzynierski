import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Router } from '@angular/router';
import { UserService } from '../../../service/user.service';
import { ReservationDto } from '../../../../shared/model/api-models';
import { ModalService } from '../../../../shared/components/base-modal/modal.service';
import { ConfirmDeleteVisitModalComponent } from '../confirm-delete-visit-modal/confirm-delete-visit-modal.component';

@Component({
  selector: 'app-reservation-item',
  templateUrl: './reservation-item.component.html',
  styleUrl: './reservation-item.component.scss',
})
export class ReservationItemComponent {
  @Input() reservation!: ReservationDto;
  @Output() reservationCancelled = new EventEmitter<void>();
  constructor(
    private userService: UserService,
    private router: Router,
    private modalService: ModalService
  ) {}

  cancelReservation(): void {
    const currentReservation: ReservationDto = {
      ...this.reservation,
    };
    const ref = this.modalService.openModal(ConfirmDeleteVisitModalComponent);
    ref.subject.next(currentReservation);
    ref.componentRef.instance.reservationCancelled.subscribe(() => {
      this.reservationCancelled.emit();
    });
  }

  rescheduleReservation(): void {
    this.router.navigate(['/services']);
  }
}
