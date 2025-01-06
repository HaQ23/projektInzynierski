import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  EmployeeDetailsDto,
  EmployeeDetailsRequest,
  EmployeeDto,
  OfferDto,
  OfferRequest,
  ReservationDetailsDto,
  UserDetailsDto,
} from '../../shared/model/api-models';
import { environment } from '../../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AdminService {
  //private readonly apiUrl = '/api';
  private readonly apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getEmployees(): Observable<EmployeeDto[]> {
    return this.http.get<EmployeeDto[]>(`${this.apiUrl}/employee`);
  }

  getAllReservationsForEmployee(
    employeeId: number
  ): Observable<ReservationDetailsDto[]> {
    return this.http.get<ReservationDetailsDto[]>(
      `${this.apiUrl}/reservations/employee/${employeeId}`
    );
  }

  getReservationsForEmployeeWithDateRange(
    employeeId: number,
    startDate: string,
    endDate: string
  ): Observable<ReservationDetailsDto[]> {
    return this.http.get<ReservationDetailsDto[]>(
      `${this.apiUrl}/reservations/employee/${employeeId}`,
      {
        params: { startDate, endDate },
      }
    );
  }

  cancelReservationByAdmin(reservationId: number): Observable<void> {
    return this.http.put<void>(
      `${this.apiUrl}/reservations/admin/cancel/${reservationId}`,
      {}
    );
  }

  deleteReservation(reservationId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/reservations/${reservationId}`
    );
  }

  getAllUsers(): Observable<UserDetailsDto[]> {
    return this.http.get<UserDetailsDto[]>(`${this.apiUrl}/user-management`);
  }

  blockUser(userId: string): Observable<void> {
    return this.http.put<void>(
      `${this.apiUrl}/user-management/block/${userId}`,
      {}
    );
  }

  unblockUser(userId: string): Observable<void> {
    return this.http.put<void>(
      `${this.apiUrl}/user-management/unblock/${userId}`,
      {}
    );
  }
  getAllOffers(): Observable<OfferDto[]> {
    return this.http.get<OfferDto[]>(`${this.apiUrl}/offer`);
  }

  deleteOffer(offerId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/offer/${offerId}`);
  }
  updateOffer(offer: OfferDto): Observable<OfferDto> {
    return this.http.put<OfferDto>(`${this.apiUrl}/offer/${offer.id}`, offer);
  }
  addOffer(offerRequest: OfferRequest): Observable<OfferDto> {
    return this.http.post<OfferDto>(`${this.apiUrl}/offer`, offerRequest);
  }
  getEmployeesDetails(): Observable<EmployeeDetailsDto[]> {
    return this.http.get<EmployeeDetailsDto[]>(
      `${this.apiUrl}/employee/details`
    );
  }

  addEmployee(
    employee: EmployeeDetailsRequest
  ): Observable<EmployeeDetailsDto> {
    return this.http.post<EmployeeDetailsDto>(
      `${this.apiUrl}/employee`,
      employee
    );
  }

  updateEmployee(employee: EmployeeDetailsDto): Observable<EmployeeDetailsDto> {
    return this.http.put<EmployeeDetailsDto>(
      `${this.apiUrl}/employee/${employee.id}`,
      employee
    );
  }

  deleteEmployee(employeeId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/employee/${employeeId}`);
  }
}
