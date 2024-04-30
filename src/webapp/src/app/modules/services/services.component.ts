import { Component } from '@angular/core';
import { EmployeeDto } from '../shared/model/api-models';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss',
})
export class ServicesComponent {
  employees: EmployeeDto[] = [
    {
      id: 1,
      firstName: 'Adam',
      lastName: 'Kowalski',
      phoneNumber: 777333222,
      employeeOfferList: [
        {
          id: 1,
          price: 100,
          title: 'Klasyczne strzyżenie, Modelowanie włosów',
          description:
            ' Klasyczne strzyżenie włosów, które podkreśli Twój indywidualny styl i osobowość. Nasz doświadczony fryzjer dopasuje fryzurę do kształtu Twojej twarzy i preferencji.',
          time: '30',
        },
        {
          id: 2,
          price: 150.0,
          title: 'Klasyczne strzyżenie, Modelowanie włosów',
          description:
            ' Klasyczne strzyżenie włosów, które podkreśli Twój indywidualny styl i osobowość. Nasz doświadczony fryzjer dopasuje fryzurę do kształtu Twojej twarzy i preferencji.',
          time: '40',
        },
      ],
    },
    {
      id: 2,
      firstName: 'Jan',
      lastName: 'Nowak',
      phoneNumber: 666444333,
      employeeOfferList: [
        {
          id: 3,
          price: 120,
          title: 'Klasyczne strzyżenie, Modelowanie włosów',
          description: 'Opis oferty 3',
          time: '30',
        },
        {
          id: 4,
          price: 200,
          title: 'Klasyczne strzyżenie, Modelowanie włosów',
          description: 'Opis oferty 4',
          time: '50',
        },
      ],
    },
  ];
}
