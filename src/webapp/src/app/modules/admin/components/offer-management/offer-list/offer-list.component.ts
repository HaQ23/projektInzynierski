import { Component, Input, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { OfferDto, OfferRequest } from '../../../../shared/model/api-models';
import { AdminService } from '../../../service/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModalService } from '../../../../shared/components/base-modal/modal.service';
import { ConfirmModalComponent } from '../../../../shared/components/confirm-modal/confirm-modal.component';
import { OfferFormModalComponent } from '../offer-form-modal/offer-form-modal.component';

@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.scss'],
})
export class OfferListComponent implements OnInit {
  @Input() offers: OfferDto[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['title', 'description', 'actions'];
  dataSource = new MatTableDataSource<OfferDto>([]);
  selectedSort: string = '';

  constructor(
    private adminService: AdminService,
    private snackBar: MatSnackBar,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.dataSource.data = this.offers;
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  ngOnChanges(): void {
    this.dataSource.data = this.offers;
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  deleteOffer(offerId: number): void {
    const confirmModalRef = this.modalService.openModal(ConfirmModalComponent);
    confirmModalRef.componentRef.instance.message =
      'Czy na pewno chcesz usunąć tę ofertę?';
    confirmModalRef.subject$.subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.adminService.deleteOffer(offerId).subscribe({
          next: () => {
            this.snackBar.open('Oferta została usunięta', 'Zamknij', {
              duration: 3000,
            });
            this.offers = this.offers.filter((offer) => offer.id !== offerId);
            this.dataSource.data = [...this.offers];
          },
          error: () => {
            this.snackBar.open('Nie udało się usunąć oferty', 'Zamknij', {
              duration: 3000,
              panelClass: ['snackbar-error'],
            });
          },
        });
      }
    });
  }

  editOffer(offer: OfferDto): void {
    const offerFormModalRef = this.modalService.openModal(
      OfferFormModalComponent
    );
    offerFormModalRef.componentRef.instance.offer = { ...offer };
    offerFormModalRef.subject$.subscribe((updatedOffer: OfferDto) => {
      if (updatedOffer) {
        this.adminService.updateOffer(updatedOffer).subscribe({
          next: (response: OfferDto) => {
            const index = this.offers.findIndex((o) => o.id === response.id);
            if (index !== -1) {
              this.offers[index] = response;
              this.dataSource.data = [...this.offers];
            }
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
                panelClass: ['snackbar-error'],
              }
            );
          },
        });
      }
    });
  }

  addOffer(): void {
    const offerFormModalRef = this.modalService.openModal(
      OfferFormModalComponent
    );
    offerFormModalRef.subject$.subscribe((newOffer: OfferRequest) => {
      if (newOffer) {
        this.adminService.addOffer(newOffer).subscribe({
          next: (createdOffer) => {
            // Dodajemy nową ofertę do listy i aktualizujemy tabelę
            this.offers.push(createdOffer);
            this.dataSource.data = [...this.offers];
            this.snackBar.open('Oferta została dodana', 'Zamknij', {
              duration: 3000,
            });
          },
          error: () => {
            this.snackBar.open('Nie udało się dodać oferty', 'Zamknij', {
              duration: 3000,
              panelClass: ['snackbar-error'],
            });
          },
        });
      }
    });
  }

  sortOffers(): void {
    switch (this.selectedSort) {
      case 'title':
        this.dataSource.data = this.offers.sort((a, b) =>
          a.title.localeCompare(b.title)
        );
        break;
      case 'description':
        this.dataSource.data = this.offers.sort((a, b) =>
          a.description.localeCompare(b.description)
        );
        break;
    }
  }
}
