import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ModalService } from '../base-modal/modal.service';
import { ModalBase } from '../base-modal/modal.base';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
})
export class ConfirmModalComponent extends ModalBase<any> implements OnInit {
  @Input() message: string = '';
  title: string = 'Potwierdzenie';

  constructor(private modalService: ModalService) {
    super();
    this.subject = new Subject<boolean>();
    this.subject$ = this.subject.asObservable();
  }

  ngOnInit(): void {}

  override nextConfirm(): void {
    this.subject.next(true);
    this.modalService.close();
  }

  override nextReject(): void {
    this.subject.next(false);
    this.modalService.close();
  }
}
