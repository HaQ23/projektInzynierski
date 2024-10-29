import { Component, OnInit, OnDestroy } from '@angular/core';
import { EmployeeDto } from '../shared/model/api-models';
import { EmployeeService } from './services/employee.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss',
})
export class ServicesComponent implements OnInit {
  private sub!: Subscription;
  constructor(private employeeService: EmployeeService) {}
  ngOnInit(): void {
    this.employeeService.getAllEmployees().subscribe();
    this.sub = this.employeeService.employeeList.subscribe(
      (data: EmployeeDto[]) => {
        this.employees = data;
      }
    );
  }
  employees: EmployeeDto[] = [];
  // employees: EmployeeDto[] = [
  //   {
  //     id: 1,
  //     firstName: 'Adam',
  //     lastName: 'Kowalski',
  //     phoneNumber: 777333222,
  //     employeeOfferList: [
  //       {
  //         id: 1,
  //         price: 100,
  //         title: 'Klasyczne strzyżenie, Modelowanie włosów',
  //         description:
  //           ' Klasyczne strzyżenie włosów, które podkreśli Twój indywidualny styl i osobowość. Nasz doświadczony fryzjer dopasuje fryzurę do kształtu Twojej twarzy i preferencji.',
  //         time: '30',
  //       },
  //       {
  //         id: 2,
  //         price: 150.0,
  //         title: 'Klasyczne strzyżenie, Modelowanie włosów',
  //         description:
  //           ' Klasyczne strzyżenie włosów, które podkreśli Twój indywidualny styl i osobowość. Nasz doświadczony fryzjer dopasuje fryzurę do kształtu Twojej twarzy i preferencji.',
  //         time: '40',
  //       },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     firstName: 'Jan',
  //     lastName: 'Nowak',
  //     phoneNumber: 666444333,
  //     employeeOfferList: [
  //       {
  //         id: 3,
  //         price: 120,
  //         title: 'Klasyczne strzyżenie, Modelowanie włosów',
  //         description: 'Opis oferty 3',
  //         time: '30',
  //       },
  //       {
  //         id: 4,
  //         price: 200,
  //         title: 'Klasyczne strzyżenie, Modelowanie włosów',
  //         description: 'Opis oferty 4',
  //         time: '50',
  //       },
  //     ],
  //   },
  // ];
  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
