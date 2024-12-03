import { Component, Input, OnInit } from '@angular/core';
import { ModalBase } from '../../../../shared/components/base-modal/modal.base';
import { ModalService } from '../../../../shared/components/base-modal/modal.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  EmployeeOfferRequest,
  OfferDto,
} from '../../../../shared/model/api-models';
import { Subject } from 'rxjs';
import { EmployeeOfferService } from '../../../service/admin-offer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-employee-offer-modal',
  templateUrl: './add-employee-offer-modal.component.html',
  styleUrls: ['./add-employee-offer-modal.component.scss'],
})
export class AddEmployeeOfferModalComponent
  extends ModalBase<any>
  implements OnInit
{
  @Input() employeeId: number | null = null;

  offerForm: FormGroup;
  availableOffers: OfferDto[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private modalService: ModalService,
    private employeeOfferService: EmployeeOfferService,
    private router: Router
  ) {
    super();
    this.subject = new Subject<any>();
    this.subject$ = this.subject.asObservable();

    this.offerForm = this.formBuilder.group({
      offerId: [null, Validators.required],
      price: [null, [Validators.required, Validators.min(0)]],
      time: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
    });
  }

  ngOnInit(): void {
    if (this.employeeId !== null) {
      this.loadAvailableOffers();
    }
  }

  loadAvailableOffers(): void {
    if (this.employeeId !== null) {
      this.employeeOfferService
        .getAvailableOffersForEmployee(this.employeeId)
        .subscribe({
          next: (offers) => {
            this.availableOffers = offers;
          },
          error: () => {
            console.error('Nie udało się pobrać dostępnych ofert');
          },
        });
    }
  }

  override nextConfirm(): void {
    if (this.offerForm.invalid) {
      return;
    }

    const formValue = this.offerForm.getRawValue();
    const newOffer: EmployeeOfferRequest = {
      employeeId: this.employeeId!,
      offerId: formValue.offerId,
      price: formValue.price,
      time: formValue.time,
    };

    this.subject.next(newOffer);
    this.modalService.close();
  }

  override nextReject(): void {
    this.subject.next(false);
    this.modalService.close();
  }

  redirectToOfferManagement(): void {
    this.modalService.close();
    this.router.navigate(['/admin/offer-management']);
  }
}
