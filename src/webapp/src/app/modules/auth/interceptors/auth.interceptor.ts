import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError, switchMap, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
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
          if (error.error?.message === 'Refresh token is expired!') {
            this.authService.logout().subscribe();
            return throwError(
              () => new Error('Unauthorized: Refresh token expired.')
            );
          }
          return this.authService.refreshToken().pipe(
            switchMap(() => next.handle(request)),
            catchError(() => {
              this.authService.logout().subscribe();
              return throwError(
                () => new Error('Unauthorized: Token refresh failed.')
              );
            })
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }
}
