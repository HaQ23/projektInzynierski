import { Component } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  openNavbar = false;

  constructor(private authService: AuthService) {}

  toggleOpenNavbar() {
    this.openNavbar = !this.openNavbar;
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  logout() {
    this.authService.logout().subscribe();
    this.toggleOpenNavbar();
  }
}
