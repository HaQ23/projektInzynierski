import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  EmployeeOfferDetailsDto,
  EmployeeOfferDto,
  EmployeeOfferRequest,
  OfferDto,
} from '../../shared/model/api-models';

@Injectable({
  providedIn: 'root',
})
export class EmployeeOfferService {
  private apiUrl = '/api/employee/offer';

  constructor(private http: HttpClient) {}

  getEmployeeOffers(employeeId: number): Observable<EmployeeOfferDetailsDto[]> {
    return this.http.get<EmployeeOfferDetailsDto[]>(
      `/api/employee/offer/${employeeId}/details`
    );
  }

  addEmployeeOffer(
    employeeOffer: EmployeeOfferRequest
  ): Observable<EmployeeOfferDto> {
    return this.http.post<EmployeeOfferDto>(this.apiUrl, employeeOffer);
  }

  updateEmployeeOffer(
    employeeOfferId: number,
    updatedOffer: EmployeeOfferRequest
  ): Observable<EmployeeOfferDto> {
    return this.http.put<EmployeeOfferDto>(
      `${this.apiUrl}/${employeeOfferId}`,
      updatedOffer
    );
  }

  deleteEmployeeOffer(employeeOfferId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${employeeOfferId}`);
  }
  getAvailableOffersForEmployee(employeeId: number): Observable<OfferDto[]> {
    return this.http.get<OfferDto[]>(
      `${this.apiUrl}/${employeeId}/available-offers`
    );
  }
}
