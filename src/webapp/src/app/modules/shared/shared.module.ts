import { NgModule } from '@angular/core';
import { MaterialModule } from './material/material.module';
import { BaseModalComponent } from './componentns/base-modal/base-modal.component';

@NgModule({
  declarations: [
    BaseModalComponent
  ],
  imports: [MaterialModule],
  exports: [MaterialModule],
})
export class SharedModule {}
