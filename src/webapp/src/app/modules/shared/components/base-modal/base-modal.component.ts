import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from './modal.service';

@Component({
  selector: 'app-base-modal',
  templateUrl: './base-modal.component.html',
  styleUrls: ['./base-modal.component.scss'],
})
export class BaseModalComponent implements OnInit {
  @Input() size: 'sm' | 'md' | 'lg' | 'xl' = 'md';
  @Input() title!: string;
  @Input() showButtons: boolean = true;

  showOverlay: boolean = true;
  constructor(private modalService: ModalService) {}

  ngOnInit(): void {
    this.modalService.getModalInstancesAmount() > 1
      ? (this.showOverlay = false)
      : null;
  }

  confirm() {
    this.modalService.confirm();
  }
  reject() {
    this.modalService.reject();
  }
  close() {
    this.modalService.close();
  }
}
