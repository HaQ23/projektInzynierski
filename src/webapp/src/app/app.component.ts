import {
  Component,
  OnInit,
  Inject,
  PLATFORM_ID,
  ViewContainerRef,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from './modules/auth/services/auth.service';
import { ModalService } from './modules/shared/components/base-modal/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private viewContainerRef: ViewContainerRef,
    private modalService: ModalService,
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.modalService.viewContainerRef = this.viewContainerRef;
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      if (!this.authService.isAuthenticated()) {
        this.authService.autologin().subscribe({
          error: (error) => {
            console.error('Autologin failed:', error);
          },
        });
      }
    }
  }
}
