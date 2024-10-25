import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, Inject } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  openNavbar = false;
  isUserAuthenticated: boolean = false;

  constructor(
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.authService.getUser().subscribe((user) => {
        this.isUserAuthenticated = !!user;
      });
    }
  }

  toggleOpenNavbar() {
    this.openNavbar = !this.openNavbar;
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.isUserAuthenticated = false;
      this.toggleOpenNavbar();
    });
  }
}
