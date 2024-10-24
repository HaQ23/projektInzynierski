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
        this.user$.next(user);
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
