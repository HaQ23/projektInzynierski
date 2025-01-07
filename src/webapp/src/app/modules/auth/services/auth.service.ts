import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import {
  LoginRequest,
  SignupRequest,
  JwtResponse,
  MessageResponse,
  UserResponse,
  User,
} from '../models/models';
import { environment } from '../../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = `${environment.apiUrl}/auth`;
  private user$ = new BehaviorSubject<User | null>(null);
  private readonly activationSessionKey = 'pendingActivationEmail';
  constructor(private http: HttpClient, private router: Router) {}

  login(loginRequest: LoginRequest): Observable<UserResponse> {
    return this.http
      .post<UserResponse>(`${this.baseUrl}/login`, loginRequest)
      .pipe(
        tap((response) => {
          console.log(response);
          this.user$.next(response);
        })
      );
  }

  register(signUpRequest: SignupRequest): Observable<MessageResponse> {
    return this.http.post<MessageResponse>(
      `${this.baseUrl}/register`,
      signUpRequest
    );
  }

  logout(): Observable<MessageResponse> {
    return this.http.post<MessageResponse>(`${this.baseUrl}/logout`, {}).pipe(
      tap(() => {
        this.user$.next(null);
        this.router.navigate(['/auth/login']);
      })
    );
  }

  refreshToken(): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(`${this.baseUrl}/refresh-token`, {});
  }

  autologin(): Observable<UserResponse | null> {
    return this.http.get<UserResponse>(`${this.baseUrl}/autologin`).pipe(
      tap((user) => {
        console.log(user);
        this.user$.next(user);
      })
    );
  }
  resendActivationEmail(request: {
    email: string;
  }): Observable<MessageResponse> {
    return this.http.post<MessageResponse>(
      `${this.baseUrl}/resend-activation`,
      request
    );
  }
  activateAccount(token: string): Observable<MessageResponse> {
    return this.http.get<MessageResponse>(`${this.baseUrl}/activate`, {
      params: { token },
    });
  }
  getUser(): Observable<UserResponse | null> {
    return this.user$.asObservable();
  }

  isAuthenticated(): boolean {
    return !!this.user$.value;
  }
  storePendingActivationSession(email: string): void {
    sessionStorage.setItem(this.activationSessionKey, email);
  }

  clearPendingActivationSession(): void {
    sessionStorage.removeItem(this.activationSessionKey);
  }

  getPendingActivationEmail(): string | null {
    return sessionStorage.getItem(this.activationSessionKey);
  }
  updateUser(updatedUser: UserResponse): void {
    this.user$.next(updatedUser);
    console.log(this.user$.value);
  }
  isAuthenticatedAsync(): Observable<boolean> {
    return this.http.get<any>(`${this.baseUrl}/autologin`).pipe(
      map((response) => {
        return response && response.username ? true : false;
      }),
      catchError(() => of(false))
    );
  }
}
