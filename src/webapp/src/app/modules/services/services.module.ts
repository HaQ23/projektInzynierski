import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesComponent } from './services.component';
import { ServicesRoutingModule } from './services-routing.module';
import { ServicesListComponent } from './services-list/services-list.component';
import { SharedModule } from '../shared/shared.module';
import { ServicesReservationModalComponent } from './services-reservation-modal/services-reservation-modal.component';

@NgModule({
  declarations: [
    ServicesComponent,
    ServicesListComponent,
    ServicesReservationModalComponent,
  ],
  imports: [CommonModule, ServicesRoutingModule, SharedModule],
})
export class ServicesModule {}
