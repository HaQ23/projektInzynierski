import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { CoreModule } from '../core/core.module';
import { HomeModule } from '../home/home.module';

@NgModule({
  declarations: [MainComponent],
  imports: [CommonModule, CoreModule, HomeModule],
})
export class MainModule {}
