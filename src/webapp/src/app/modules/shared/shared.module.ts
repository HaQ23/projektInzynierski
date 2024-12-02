import { NgModule } from '@angular/core';
import { MaterialModule } from './material/material.module';

import { CommonModule } from '@angular/common';
import { BaseModalComponent } from './components/base-modal/base-modal.component';
import { InfoModalComponent } from './components/info-modal/info-modal.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';

@NgModule({
  declarations: [BaseModalComponent, InfoModalComponent, ConfirmModalComponent],
  imports: [MaterialModule, CommonModule],
  exports: [MaterialModule, BaseModalComponent],
})
export class SharedModule {}
