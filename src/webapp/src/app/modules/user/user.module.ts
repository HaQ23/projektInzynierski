import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { UserRoutingModule } from './user-routing.module';
import { UserVisitsComponent } from './components/user-visits/user-visits.component';
import { UserSettingsComponent } from './components/user-settings/user-settings.component';
import { ReservationItemComponent } from './components/user-visits/reservation-item/reservation-item.component';
import { SharedModule } from '../shared/shared.module';
import { ConfirmDeleteVisitModalComponent } from './components/user-visits/confirm-delete-visit-modal/confirm-delete-visit-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TermsAndConditionsComponent } from './components/terms-and-conditions/terms-and-conditions.component';

@NgModule({
  declarations: [
    UserDashboardComponent,
    UserVisitsComponent,
    UserSettingsComponent,
    ReservationItemComponent,
    ConfirmDeleteVisitModalComponent,
    TermsAndConditionsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    UserRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class UserModule {}
