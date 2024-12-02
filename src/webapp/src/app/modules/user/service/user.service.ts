import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  ReservationDto,
  UpdateUserRequest,
  UserInfoResponse,
} from '../../shared/model/api-models';

import { MessageResponse } from '../../auth/models/models';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = '/api/';

  constructor(private http: HttpClient) {}

  getUpcomingReservations(): Observable<ReservationDto[]> {
    return this.http.get<ReservationDto[]>(
      `${this.baseUrl}reservations/user-upcoming-reservations`
    );
  }

  getPastReservations(): Observable<ReservationDto[]> {
    return this.http.get<ReservationDto[]>(
      `${this.baseUrl}reservations/user-past-reservations`
    );
  }
  cancelReservation(reservationId: number): Observable<void> {
    return this.http.put<void>(
      `${this.baseUrl}reservations/cancel/${reservationId}`,
      {}
    );
  }
  getUserInfo(): Observable<UserInfoResponse> {
    return this.http.get<UserInfoResponse>(`${this.baseUrl}user/me`);
  }

  changePassword(
    oldPassword: string,
    newPassword: string
  ): Observable<MessageResponse> {
    return this.http.put<MessageResponse>(
      `${this.baseUrl}user/change-password`,
      {
        oldPassword,
        newPassword,
      }
    );
  }

  updateUserInfo(
    updateRequest: UpdateUserRequest
  ): Observable<MessageResponse> {
    return this.http.put<MessageResponse>(
      `${this.baseUrl}user/update-info`,
      updateRequest
    );
  }
}
