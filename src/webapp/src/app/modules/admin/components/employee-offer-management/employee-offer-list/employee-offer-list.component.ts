import { Component, Input, Output, EventEmitter } from '@angular/core';
import { EmployeeOfferDetailsDto } from '../../../../shared/model/api-models';

@Component({
  selector: 'app-employee-offer-list',
  templateUrl: './employee-offer-list.component.html',
  styleUrls: ['./employee-offer-list.component.scss'],
})
export class EmployeeOfferListComponent {
  @Input() offers: EmployeeOfferDetailsDto[] = [];
  @Output() offerDeleted = new EventEmitter<number>();
  @Output() offerEdited = new EventEmitter<EmployeeOfferDetailsDto>();

  deleteOffer(offerId: number): void {
    this.offerDeleted.emit(offerId);
  }

  editOffer(offer: EmployeeOfferDetailsDto): void {
    this.offerEdited.emit(offer);
  }
}
