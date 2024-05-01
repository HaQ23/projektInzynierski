import { NgModule } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [NavbarComponent, FooterComponent],
  imports: [CommonModule, SharedModule, RouterModule],
  exports: [NavbarComponent, FooterComponent],
})
export class CoreModule {}
