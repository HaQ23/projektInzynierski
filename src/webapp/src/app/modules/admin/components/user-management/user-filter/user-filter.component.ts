import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserDetailsDto } from '../../../../shared/model/api-models';

@Component({
  selector: 'app-user-filter',
  templateUrl: './user-filter.component.html',
  styleUrls: ['./user-filter.component.scss'],
})
export class UserFilterComponent {
  @Input() users: UserDetailsDto[] = [];
  @Output() filteredUsers = new EventEmitter<UserDetailsDto[]>();

  selectedStatus: string = '';
  usernameSearch: string = '';
  emailSearch: string = '';

  applyFilters(): void {
    let filteredData = this.users;

    if (this.selectedStatus) {
      filteredData = filteredData.filter(
        (user) =>
          (user.enabled ? 'enabled' : 'disabled') === this.selectedStatus
      );
    }

    if (this.usernameSearch) {
      const searchLower = this.usernameSearch.toLowerCase();
      filteredData = filteredData.filter((user) =>
        user.username.toLowerCase().includes(searchLower)
      );
    }

    if (this.emailSearch) {
      const searchLower = this.emailSearch.toLowerCase();
      filteredData = filteredData.filter((user) =>
        user.email.toLowerCase().includes(searchLower)
      );
    }

    this.filteredUsers.emit(filteredData);
  }
}
