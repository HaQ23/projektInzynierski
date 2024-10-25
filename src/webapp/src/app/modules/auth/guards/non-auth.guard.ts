import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class NonAuthGuard {
  canActivate: CanActivateFn = (route, state) => {
    if (!this.authService.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  };

  constructor(private authService: AuthService, private router: Router) {}
}
