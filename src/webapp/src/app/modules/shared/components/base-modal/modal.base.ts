import { Observable, Subject } from 'rxjs';
import { ComponentRef } from '@angular/core';
import { BaseComponent } from '../../base/base.component';

export abstract class ModalBase<T = any> extends BaseComponent {
  subject: Subject<T> = new Subject<T>();
  subject$: Observable<T> = this.subject.asObservable();
  componentRef!: ComponentRef<T>;
  abstract nextConfirm(): void;
  abstract nextReject(): void;
}
