import {
  Injectable,
  Type,
  ViewContainerRef,
  ComponentRef,
} from '@angular/core';
import { ModalBase } from './modal.base';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private instances: { [key: number]: ModalBase<any> } = {};
  private activeInstance: ModalBase<any> | null = null;
  public viewContainerRef!: ViewContainerRef;

  constructor() {}

  openModal<T extends ModalBase>(component: Type<T>): ModalBase<any> {
    const componentRef: ComponentRef<T> =
      this.viewContainerRef.createComponent(component);
    const instance: ModalBase<any> = componentRef.instance;

    if (this.getModalInstancesAmount() > 0 && this.activeInstance) {
      this.activeInstance.componentRef.location.nativeElement.firstChild.firstChild.classList.add(
        'modal-disabled'
      );
    }

    this.activeInstance = instance;
    this.activeInstance.componentRef = componentRef;
    this.instances[this.getModalInstancesAmount()] = instance;

    return this.activeInstance;
  }

  confirm(): void {
    if (this.activeInstance) {
      this.activeInstance.nextConfirm();
    }
  }

  reject(): void {
    if (this.activeInstance) {
      this.activeInstance.nextReject();
    }
  }

  close(): void {
    if (this.activeInstance) {
      this.deleteModal();
    }
  }

  private deleteModal(): void {
    if (this.activeInstance) {
      this.activeInstance.componentRef.destroy();
      delete this.instances[this.getModalInstancesAmount() - 1];
      this.activeInstance = Object.values(this.instances).pop() || null;

      if (this.activeInstance) {
        this.activeInstance.componentRef.location.nativeElement.firstChild.firstChild.classList.remove(
          'modal-disabled'
        );
      }
    }
  }

  getModalInstancesAmount(): number {
    return Object.keys(this.instances).length;
  }
}
