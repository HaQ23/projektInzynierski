import { Component, OnInit } from '@angular/core';
import {
  EmployeeOfferDetailsDto,
  EmployeeDto,
  EmployeeOfferRequest,
} from '../../../shared/model/api-models';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from '../../service/admin.service';
import { EmployeeOfferService } from '../../service/admin-offer.service';
import { ModalService } from '../../../shared/components/base-modal/modal.service';

import { ConfirmModalComponent } from '../../../shared/components/confirm-modal/confirm-modal.component';
import { AddEmployeeOfferModalComponent } from './add-employee-offer-modal/add-employee-offer-modal.component';
import { EditEmployeeOfferModalComponent } from './edit-employee-offer-modal/edit-employee-offer-modal.component';

@Component({
  selector: 'app-employee-offer-management',
  templateUrl: './employee-offer-management.component.html',
  styleUrls: ['./employee-offer-management.component.scss'],
})
export class EmployeeOfferManagementComponent implements OnInit {
  employeeOffers: EmployeeOfferDetailsDto[] = [];
  filteredEmployeeOffers: EmployeeOfferDetailsDto[] = [];
  employees: EmployeeDto[] = [];
  selectedEmployeeId: number | null = null;
  offerSearch: string = '';
  selectedSort: string = '';

  constructor(
    private employeeOfferService: EmployeeOfferService,
    private adminService: AdminService,
    private snackBar: MatSnackBar,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.adminService.getEmployees().subscribe({
      next: (employees) => {
        this.employees = employees;
        if (employees.length > 0) {
          this.selectedEmployeeId = employees[0].id;
          this.fetchEmployeeOffers();
        }
      },
      error: () => {
        this.snackBar.open('Nie udało się pobrać pracowników', 'Zamknij', {
          duration: 3000,
        });
      },
    });
  }

  fetchEmployeeOffers(): void {
    if (this.selectedEmployeeId !== null) {
      this.employeeOfferService
        .getEmployeeOffers(this.selectedEmployeeId)
        .subscribe({
          next: (offers) => {
            this.employeeOffers = offers;
            this.applyFilters();
          },
          error: () => {
            this.snackBar.open(
              'Nie udało się pobrać ofert pracownika',
              'Zamknij',
              {
                duration: 3000,
              }
            );
          },
        });
    }
  }

  applyFilters(): void {
    this.filteredEmployeeOffers = this.employeeOffers.filter((offer) => {
      let matchesSearch = true;
      if (this.offerSearch) {
        matchesSearch = offer.title
          .toLowerCase()
          .includes(this.offerSearch.toLowerCase());
      }
      return matchesSearch;
    });

    this.sortOffers();
  }

  sortOffers(): void {
    if (this.selectedSort) {
      this.filteredEmployeeOffers.sort((a, b) => {
        const key = this.selectedSort as keyof EmployeeOfferDetailsDto;

        if (typeof a[key] === 'number' && typeof b[key] === 'number') {
          return (a[key] as number) - (b[key] as number);
        } else if (typeof a[key] === 'string' && typeof b[key] === 'string') {
          return (a[key] as string).localeCompare(b[key] as string);
        } else {
          return 0;
        }
      });
    }
  }

  addEmployeeOffer(): void {
    if (this.selectedEmployeeId === null) {
      return;
    }
    const offerFormModalRef = this.modalService.openModal(
      AddEmployeeOfferModalComponent
    );
    offerFormModalRef.componentRef.instance.employeeId =
      this.selectedEmployeeId;
    offerFormModalRef.subject$.subscribe((newOffer: EmployeeOfferRequest) => {
      if (newOffer) {
        this.employeeOfferService.addEmployeeOffer(newOffer).subscribe({
          next: () => {
            this.fetchEmployeeOffers();
            this.snackBar.open('Oferta została dodana', 'Zamknij', {
              duration: 3000,
            });
          },
          error: () => {
            this.snackBar.open('Nie udało się dodać oferty', 'Zamknij', {
              duration: 3000,
            });
          },
        });
      }
    });
  }

  onOfferDeleted(offerId: number): void {
    const confirmModalRef = this.modalService.openModal(ConfirmModalComponent);
    confirmModalRef.componentRef.instance.message =
      'Czy na pewno chcesz usunąć tę ofertę?';
    confirmModalRef.subject$.subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.employeeOfferService.deleteEmployeeOffer(offerId).subscribe({
          next: () => {
            this.fetchEmployeeOffers();
            this.snackBar.open('Oferta została usunięta', 'Zamknij', {
              duration: 3000,
            });
          },
          error: () => {
            this.snackBar.open('Nie udało się usunąć oferty', 'Zamknij', {
              duration: 3000,
            });
          },
        });
      }
    });
  }

  onOfferEdited(offer: EmployeeOfferDetailsDto): void {
    const offerFormModalRef = this.modalService.openModal(
      EditEmployeeOfferModalComponent
    );
    offerFormModalRef.componentRef.instance.offer = { ...offer };
    offerFormModalRef.subject$.subscribe(
      (updatedOffer: EmployeeOfferRequest) => {
        if (updatedOffer) {
          updatedOffer.employeeId = offer.employeeId;
          updatedOffer.offerId = offer.offerId;
          this.employeeOfferService
            .updateEmployeeOffer(offer.id, updatedOffer)
            .subscribe({
              next: () => {
                this.fetchEmployeeOffers();
                this.snackBar.open('Oferta została zaktualizowana', 'Zamknij', {
                  duration: 3000,
                });
              },
              error: () => {
                this.snackBar.open(
                  'Nie udało się zaktualizować oferty',
                  'Zamknij',
                  {
                    duration: 3000,
                  }
                );
              },
            });
        }
      }
    );
  }
}
