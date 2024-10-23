import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import {
  LoginRequest,
  SignupRequest,
  JwtResponse,
  MessageResponse,
  UserResponse,
} from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = '/api/auth';
  private user$ = new BehaviorSubject<UserResponse | null>(null);

  constructor(private http: HttpClient, private router: Router) {}

  login(loginRequest: LoginRequest): Observable<UserResponse> {
    return this.http
      .post<UserResponse>(`${this.baseUrl}/login`, loginRequest)
      .pipe(
        tap((response) => {
          this.user$.next(response);
        }),
        catchError((error) => {
          let errorMessage = 'Failed to log in. Please try again later.';
          if (error.status === 401) {
            errorMessage = 'Nieprawidłowe hasło.';
          } else if (error.status === 404) {
            errorMessage = 'Użytkownik o takiej nazwie nie istnieje.';
          }
          return throwError(() => new Error(errorMessage));
        })
      );
  }

  register(signUpRequest: SignupRequest): Observable<MessageResponse> {
    return this.http
      .post<MessageResponse>(`${this.baseUrl}/register`, signUpRequest)
      .pipe(
        catchError((error) => {
          let errorMessage = 'Failed to register. Please try again later.';
          if (error.status === 400) {
            errorMessage = 'Bad request: Email or username already taken.';
          }
          return throwError(() => new Error(errorMessage));
        })
      );
  }

  logout(): void {
    this.http
      .post<MessageResponse>(
        `${this.baseUrl}/logout`,
        {},
        { withCredentials: true }
      )
      .subscribe({
        next: () => {
          this.user$.next(null);
          this.router.navigate(['/auth/login']);
        },
      });
  }

  refreshToken(): Observable<JwtResponse> {
    return this.http
      .post<JwtResponse>(
        `${this.baseUrl}/refresh-token`,
        {},
        { withCredentials: true }
      )
      .pipe(
        catchError((error) => {
          let errorMessage = 'Failed to refresh token. Please try again later.';
          if (error.status === 401) {
            errorMessage = 'Unauthorized: Refresh token expired.';
          }
          return throwError(() => new Error(errorMessage));
        })
      );
  }

  autologin(): Observable<UserResponse | null> {
    return this.http.get<UserResponse>(`${this.baseUrl}/autologin`).pipe(
      tap((user) => {
        this.user$.next(user);
      }),
      catchError((error) => {
        if (error.status === 401) {
          console.log('Autologin failed: Użytkownik nie jest zalogowany.');
        }
        return of(null);
      })
    );
  }

  getUser(): Observable<UserResponse | null> {
    return this.user$.asObservable();
  }

  isAuthenticated(): boolean {
    return !!this.user$.value;
  }
}
