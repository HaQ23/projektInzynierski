import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.scss'],
})
export class ActivateAccountComponent implements OnInit {
  message: string | null = null;
  errorMessage: string | null = null;
  redirectCountdown: number = 10;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const token = this.route.snapshot.queryParamMap.get('token');
      if (token) {
        this.activateAccount(token);
      } else {
        this.errorMessage = 'Brak tokena aktywacyjnego.';
      }
    }
  }

  private activateAccount(token: string): void {
    this.authService.activateAccount(token).subscribe({
      next: (response) => {
        this.message =
          'Konto zostało pomyślnie aktywowane. Następuje logowanie...';

        this.authService.autologin().subscribe({
          next: () => {
            this.authService.clearPendingActivationSession();
            this.startRedirectCountdown();
          },
          error: () => {
            this.errorMessage = 'Nie udało się zalogować po aktywacji konta.';
          },
        });
      },
      error: () => {
        this.errorMessage =
          'Nie udało się aktywować konta. Token jest nieprawidłowy lub wygasł.';
      },
    });
  }

  private startRedirectCountdown(): void {
    const intervalId = setInterval(() => {
      this.redirectCountdown--;
      if (this.redirectCountdown === 0) {
        clearInterval(intervalId);
        this.router.navigate(['/']);
      }
    }, 1000);
  }

  onGoToHome(): void {
    this.router.navigate(['/']);
  }
}
