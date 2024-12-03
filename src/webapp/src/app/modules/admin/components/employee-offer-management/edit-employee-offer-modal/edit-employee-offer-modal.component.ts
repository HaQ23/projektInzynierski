import { Component, Input, OnInit } from '@angular/core';
import { ModalBase } from '../../../../shared/components/base-modal/modal.base';
import { ModalService } from '../../../../shared/components/base-modal/modal.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeOfferDetailsDto } from '../../../../shared/model/api-models';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-edit-employee-offer-modal',
  templateUrl: './edit-employee-offer-modal.component.html',
  styleUrls: ['./edit-employee-offer-modal.component.scss'],
})
export class EditEmployeeOfferModalComponent
  extends ModalBase<any>
  implements OnInit
{
  @Input() offer: EmployeeOfferDetailsDto | null = null;

  offerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private modalService: ModalService
  ) {
    super();
    this.subject = new Subject<any>();
    this.subject$ = this.subject.asObservable();

    this.offerForm = this.formBuilder.group({
      price: [null, [Validators.required, Validators.min(0)]],
      time: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
    });
  }

  ngOnInit(): void {
    if (this.offer) {
      this.offerForm.patchValue({
        price: this.offer.price,
        time: this.offer.time,
      });
    }
  }

  override nextConfirm(): void {
    if (this.offerForm.invalid) {
      return;
    }
    const formValue = this.offerForm.getRawValue();
    if (this.offer) {
      this.offer.price = formValue.price;
      this.offer.time = formValue.time;
      this.subject.next(this.offer);
    }
    this.modalService.close();
  }

  override nextReject(): void {
    this.subject.next(false);
    this.modalService.close();
  }
}
