import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

export const adminRoleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.getUser().pipe(
    map((user) => {
      if (user && user.role === 'ADMIN') {
        return true;
      } else {
        router.navigate(['/auth/login']);
        return false;
      }
    })
  );
};
