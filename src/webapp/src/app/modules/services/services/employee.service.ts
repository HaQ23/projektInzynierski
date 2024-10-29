import { Injectable } from '@angular/core';
import { EmployeeDto } from '../../shared/model/api-models';
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
}
