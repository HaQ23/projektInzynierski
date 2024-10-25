import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-activation-account',
  templateUrl: './activation-account.component.html',
  styleUrls: ['./activation-account.component.scss'],
})
export class ActivationAccountComponent {
  message: string | null = null;

  constructor(private authService: AuthService) {}

  resendActivationEmail(): void {
    const email = sessionStorage.getItem('pendingActivationEmail');

    if (email) {
      this.authService.resendActivationEmail({ email }).subscribe({
        next: (response) => {
          this.message =
            'E-mail aktywacyjny został wysłany ponownie. Sprawdź swoją skrzynkę e-mail.';
        },
        error: (error) => {
          this.message =
            'Wystąpił problem z ponownym wysłaniem e-maila. Spróbuj ponownie później.';
        },
      });
    } else {
      this.message = 'Nie znaleziono informacji o użytkowniku.';
    }
  }
}
