import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { HomeRoutingModule } from './home-routing.modules';
import { OurServicesComponent } from './our-services/our-services.component';

@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent,
    AboutUsComponent,
    OurServicesComponent,
  ],
  imports: [CommonModule, SharedModule, HomeRoutingModule],
  exports: [HomeComponent],
})
export class HomeModule {}
