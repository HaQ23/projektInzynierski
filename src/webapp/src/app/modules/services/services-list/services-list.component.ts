import { Component, Input } from '@angular/core';
import { EmployeeDto } from '../../shared/model/api-models';

@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.component.html',
  styleUrl: './services-list.component.scss',
})
export class ServicesListComponent {
  @Input() employee!: EmployeeDto;
  isVisible = true;
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
}
