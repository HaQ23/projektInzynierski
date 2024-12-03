import { Injectable } from '@angular/core';
import {
  EmployeeDto,
  EmployeeScheduleRequest,
  ReservationRequest,
  UnavailableDayDto,
} from '../../shared/model/api-models';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiUrl = '/api';
  employeeList: Subject<EmployeeDto[]> = new Subject<EmployeeDto[]>();

  constructor(private httpClinet: HttpClient) {}

  getAllEmployees(): Observable<EmployeeDto[]> {
    return this.httpClinet.get<EmployeeDto[]>(`${this.apiUrl}/employee`).pipe(
      tap((employeeList) => {
        this.employeeList.next(employeeList);
      })
    );
  }

  getUnavailableDays(): Observable<UnavailableDayDto[]> {
    return this.httpClinet.get<UnavailableDayDto[]>(
      `${this.apiUrl}/unavailable-days`
    );
  }
  getAvailableTimeSlots(
    request: EmployeeScheduleRequest
  ): Observable<string[]> {
    return this.httpClinet.post<string[]>(
      `${this.apiUrl}/employee/schedule/available-slots`,
      request
    );
  }
  addReservation(reservationRequest: ReservationRequest): Observable<void> {
    return this.httpClinet.post<void>(
      `${this.apiUrl}/reservations`,
      reservationRequest
    );
  }
}
