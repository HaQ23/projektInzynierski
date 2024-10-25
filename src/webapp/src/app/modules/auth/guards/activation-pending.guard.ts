import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ActivationPendingGuard {
  canActivate: CanActivateFn = (route, state) => {
    if (isPlatformBrowser(this.platformId)) {
      const email = sessionStorage.getItem('pendingActivationEmail');
      if (email) {
        return true;
      } else {
        this.router.navigate(['/auth/login']);
        return false;
      }
    }
    this.router.navigate(['/auth/login']);
    return false;
  };

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}
}
