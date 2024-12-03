import { Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UserDetailsDto } from '../../../../shared/model/api-models';
import { AdminService } from '../../../service/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModalService } from '../../../../shared/components/base-modal/modal.service';
import { ConfirmModalComponent } from '../../../../shared/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent {
  @Input() users: UserDetailsDto[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = [
    'username',
    'firstname',
    'lastname',
    'email',
    'phoneNumber',
    'address',
    'status',
    'reservationCount',
    'actions',
  ];
  dataSource = new MatTableDataSource<UserDetailsDto>([]);
  selectedSort: string = '';

  constructor(
    private adminService: AdminService,
    private snackBar: MatSnackBar,
    private modalService: ModalService
  ) {}

  ngOnChanges(): void {
    this.dataSource.data = this.users;
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  blockUser(userId: string): void {
    const confirmModalRef = this.modalService.openModal(ConfirmModalComponent);
    confirmModalRef.componentRef.instance.message =
      'Czy na pewno chcesz zablokować to konto?';
    confirmModalRef.subject$.subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.adminService.blockUser(userId).subscribe({
          next: () => {
            this.snackBar.open('Konto zostało zablokowane', 'Zamknij', {
              duration: 3000,
            });
            this.updateUserStatus(userId, false);
          },
          error: () => {
            this.snackBar.open('Nie udało się zablokować konta', 'Zamknij', {
              duration: 3000,
              panelClass: ['snackbar-error'],
            });
          },
        });
      }
    });
  }

  unblockUser(userId: string): void {
    const confirmModalRef = this.modalService.openModal(ConfirmModalComponent);
    confirmModalRef.componentRef.instance.message =
      'Czy na pewno chcesz odblokować to konto?';
    confirmModalRef.subject$.subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.adminService.unblockUser(userId).subscribe({
          next: () => {
            this.snackBar.open('Konto zostało odblokowane', 'Zamknij', {
              duration: 3000,
            });
            this.updateUserStatus(userId, true);
          },
          error: () => {
            this.snackBar.open('Nie udało się odblokować konta', 'Zamknij', {
              duration: 3000,
              panelClass: ['snackbar-error'],
            });
          },
        });
      }
    });
  }

  updateUserStatus(userId: string, enabled: boolean): void {
    const user = this.users.find((u) => u.id === userId);
    if (user) {
      user.enabled = enabled;
      this.dataSource.data = [...this.users];
    }
  }

  sortUsers(): void {
    switch (this.selectedSort) {
      case 'firstname':
        this.dataSource.data = this.users.sort((a, b) =>
          a.firstname.localeCompare(b.firstname)
        );
        break;
      case 'lastname':
        this.dataSource.data = this.users.sort((a, b) =>
          a.lastname.localeCompare(b.lastname)
        );
        break;
      case 'reservationCount':
        this.dataSource.data = this.users.sort(
          (a, b) => a.reservationCount - b.reservationCount
        );
        break;
    }
  }
}
