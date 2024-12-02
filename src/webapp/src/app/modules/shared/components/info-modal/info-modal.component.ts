import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from '../base-modal/modal.service';
import { ModalBase } from '../base-modal/modal.base';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-info-modal',
  templateUrl: './info-modal.component.html',
  styleUrls: ['./info-modal.component.scss'],
})
export class InfoModalComponent extends ModalBase implements OnInit {
  title: string = 'Informacja';
  message: string = '';

  constructor(private modalService: ModalService) {
    super();
    this.subject = new Subject<string>();
    this.subject$ = this.subject.asObservable();
    this.subject$.subscribe({
      next: (message) => {
        this.message = message;
      },
    });
  }
  ngOnInit(): void {}

  closeModal(): void {
    this.modalService.close();
  }
  override nextConfirm(): void {}
  override nextReject(): void {
    this.modalService.close();
  }
}
