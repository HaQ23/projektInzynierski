import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError, switchMap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = request.clone({
      withCredentials: true,
    });

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && this.authService.isAuthenticated()) {
          return this.authService.refreshToken().pipe(
            switchMap(() => next.handle(request)),
            catchError(() => {
              this.authService.logout();
              return throwError(
                () => new Error('Unauthorized: Token refresh failed.')
              );
            })
          );
        } else if (error.status === 401) {
          this.authService.logout();
          return throwError(
            () => new Error('Unauthorized: User not logged in.')
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }
}
