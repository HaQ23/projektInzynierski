import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesComponent } from './services.component';
import { ServicesRoutingModule } from './services-routing.module';
import { ServicesListComponent } from './services-list/services-list.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ServicesComponent, ServicesListComponent],
  imports: [CommonModule, ServicesRoutingModule, SharedModule],
})
export class ServicesModule {}
