import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { ReservationManagementComponent } from './components/reservation-management/reservation-management.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReservationListComponent } from './components/reservation-management/reservation-list/reservation-list.component';

import { UserFilterComponent } from './components/user-management/user-filter/user-filter.component';
import { UserListComponent } from './components/user-management/user-list/user-list.component';
import { OfferManagementComponent } from './components/offer-management/offer-management.component';
import { OfferListComponent } from './components/offer-management/offer-list/offer-list.component';
import { OfferFormModalComponent } from './components/offer-management/offer-form-modal/offer-form-modal.component';
import { EmployeeManagementComponent } from './components/employee-management/employee-management.component';
import { EmployeeListComponent } from './components/employee-management/employee-list/employee-list.component';
import { EmployeeFormModalComponent } from './components/employee-management/employee-form-modal/employee-form-modal.component';

@NgModule({
  declarations: [
    UserManagementComponent,
    ReservationManagementComponent,
    AdminDashboardComponent,
    ReservationListComponent,

    UserFilterComponent,
    UserListComponent,
    OfferManagementComponent,
    OfferListComponent,
    OfferFormModalComponent,
    EmployeeManagementComponent,
    EmployeeListComponent,
    EmployeeFormModalComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class AdminModule {}
