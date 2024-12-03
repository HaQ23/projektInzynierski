import { Component, Input } from '@angular/core';
import { ModalBase } from '../../../../shared/components/base-modal/modal.base';
import { ModalService } from '../../../../shared/components/base-modal/modal.service';
import { OfferDto, OfferRequest } from '../../../../shared/model/api-models';

@Component({
  selector: 'app-offer-form-modal',
  templateUrl: './offer-form-modal.component.html',
  styleUrls: ['./offer-form-modal.component.scss'],
})
export class OfferFormModalComponent extends ModalBase {
  @Input() offer: OfferDto | null = null;

  offerTitle: string = '';
  offerDescription: string = '';

  constructor(private modalService: ModalService) {
    super();
  }

  ngOnInit(): void {
    if (this.offer) {
      this.offerTitle = this.offer.title;
      this.offerDescription = this.offer.description;
    }
  }

  override nextConfirm(): void {
    if (this.offer) {
      this.offer.title = this.offerTitle;
      this.offer.description = this.offerDescription;
      this.subject.next(this.offer);
    } else {
      const newOffer: OfferRequest = {
        title: this.offerTitle,
        description: this.offerDescription,
      };
      this.subject.next(newOffer);
    }
    this.modalService.close();
  }

  override nextReject(): void {
    this.modalService.close();
  }
}
