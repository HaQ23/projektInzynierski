import { NgModule } from '@angular/core';
import { MaterialModule } from './material/material.module';

import { CommonModule } from '@angular/common';
import { BaseModalComponent } from './components/base-modal/base-modal.component';
import { InfoModalComponent } from './components/info-modal/info-modal.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { SpinnerComponent } from './components/spinner/spinner.component';

@NgModule({
  declarations: [
    BaseModalComponent,
    InfoModalComponent,
    ConfirmModalComponent,
    SpinnerComponent,
  ],
  imports: [MaterialModule, CommonModule],
  exports: [MaterialModule, BaseModalComponent, SpinnerComponent],
})
export class SharedModule {}
