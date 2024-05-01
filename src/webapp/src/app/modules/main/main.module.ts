import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { CoreModule } from '../core/core.module';
import { HomeModule } from '../home/home.module';
import { MainRoutingModule } from './main-routing.module';

@NgModule({
  declarations: [MainComponent],
  imports: [CommonModule, MainRoutingModule, CoreModule, HomeModule],
})
export class MainModule {}
