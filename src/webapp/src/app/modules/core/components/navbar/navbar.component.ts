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
  userRole: string | null = null;

  constructor(
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.authService.getUser().subscribe((user) => {
        if (user) {
          this.isUserAuthenticated = true;
          this.userRole = user.role;
        } else {
          this.isUserAuthenticated = false;
          this.userRole = null;
        }
      });
    }
  }

  toggleOpenNavbar() {
    this.openNavbar = !this.openNavbar;
  }
}
