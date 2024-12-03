import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from '../../service/admin.service';
import { OfferDto, OfferRequest } from '../../../shared/model/api-models';
import { ModalService } from '../../../shared/components/base-modal/modal.service';
import { OfferFormModalComponent } from './offer-form-modal/offer-form-modal.component';

@Component({
  selector: 'app-offer-management',
  templateUrl: './offer-management.component.html',
  styleUrls: ['./offer-management.component.scss'],
})
export class OfferManagementComponent implements OnInit {
  offers: OfferDto[] = [];

  constructor(
    private adminService: AdminService,
    private snackBar: MatSnackBar,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.loadOffers();
  }

  loadOffers(): void {
    this.adminService.getAllOffers().subscribe({
      next: (offers) => {
        this.offers = offers;
      },
      error: () => {
        this.snackBar.open('Nie udało się pobrać ofert', 'Zamknij', {
          duration: 3000,
          panelClass: ['snackbar-error'],
        });
      },
    });
  }

  onOfferDeleted(): void {
    this.loadOffers();
  }
}
