import { Component, Input } from '@angular/core';
import { EmployeeDto, OfferDto } from '../../shared/model/api-models';
import { ModalService } from '../../shared/components/base-modal/modal.service';
import { ServicesReservationModalComponent } from '../services-reservation-modal/services-reservation-modal.component';

@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.scss'],
})
export class ServicesListComponent {
  @Input() employee!: EmployeeDto;
  isVisible = true;

  constructor(private modalService: ModalService) {}

  toggleVisibilityServices(): void {
    this.isVisible = !this.isVisible;
  }

  displayNumberOfService(): string {
    if (this.employee.employeeOfferList.length === 1) {
      return 'usługa';
    } else if (
      this.employee.employeeOfferList.length === 2 ||
      this.employee.employeeOfferList.length === 3 ||
      this.employee.employeeOfferList.length === 4
    ) {
      return 'usługi';
    }
    return 'usług';
  }

  openReservationModal(service: OfferDto): void {
    const employeeWithSingleService: EmployeeDto = {
      ...this.employee,
      employeeOfferList: [service],
    };
    const ref = this.modalService.openModal(ServicesReservationModalComponent);
    ref.subject.next(employeeWithSingleService);
  }
}
