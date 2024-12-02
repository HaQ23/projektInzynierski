import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from '../../service/admin.service';
import { UserDetailsDto } from '../../../shared/model/api-models';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
})
export class UserManagementComponent implements OnInit {
  users: UserDetailsDto[] = [];
  filteredUsers: UserDetailsDto[] = [];

  constructor(
    private adminService: AdminService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.adminService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.filteredUsers = users; // Domyślnie, wszystkie użytkownicy są widoczni
      },
      error: () => {
        this.snackBar.open('Nie udało się pobrać użytkowników', 'Zamknij', {
          duration: 3000,
          panelClass: ['snackbar-error'],
        });
      },
    });
  }

  onFilterChange(filteredUsers: UserDetailsDto[]): void {
    this.filteredUsers = filteredUsers;
  }
}
