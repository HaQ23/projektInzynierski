import { Component, Input } from '@angular/core';
import { ModalBase } from '../../../../shared/components/base-modal/modal.base';
import { ModalService } from '../../../../shared/components/base-modal/modal.service';
import {
  EmployeeDetailsDto,
  EmployeeDetailsRequest,
} from '../../../../shared/model/api-models';

@Component({
  selector: 'app-employee-form-modal',
  templateUrl: './employee-form-modal.component.html',
  styleUrls: ['./employee-form-modal.component.scss'],
})
export class EmployeeFormModalComponent extends ModalBase {
  @Input() employee: EmployeeDetailsDto | null = null;

  firstName: string = '';
  lastName: string = '';
  phoneNumber: string = '';

  constructor(private modalService: ModalService) {
    super();
  }

  ngOnInit(): void {
    if (this.employee) {
      this.firstName = this.employee.firstName;
      this.lastName = this.employee.lastName;
      this.phoneNumber = this.employee.phoneNumber;
    }
  }

  override nextConfirm(): void {
    if (this.employee) {
      this.employee.firstName = this.firstName;
      this.employee.lastName = this.lastName;
      this.employee.phoneNumber = this.phoneNumber;
      this.subject.next(this.employee);
    } else {
      const newEmployee: EmployeeDetailsRequest = {
        firstName: this.firstName,
        lastName: this.lastName,
        phoneNumber: this.phoneNumber,
      };
      this.subject.next(newEmployee);
    }
    this.modalService.close();
  }

  override nextReject(): void {
    this.modalService.close();
  }
}
