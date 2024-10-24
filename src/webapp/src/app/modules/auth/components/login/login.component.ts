import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;
  hide = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const loginRequest = {
        username: this.loginForm.value.username,
        password: this.loginForm.value.password,
      };

      this.authService.login(loginRequest).subscribe({
        next: (response) => {
          this.errorMessage = null;
          this.router.navigate(['/']);
        },
        error: (error) => {
          if (error.status === 401) {
            this.errorMessage = 'Nieprawidłowe hasło.';
          } else if (error.status === 404) {
            this.errorMessage = 'Użytkownik o takiej nazwie nie istnieje.';
          } else {
            this.errorMessage =
              'Nie udało się zalogować. Spróbuj ponownie później.';
          }
        },
      });
    }
  }
  logout() {
    this.authService.logout();
  }
  togglePasswordVisibility(event: Event): void {
    event.stopPropagation();
    this.hide = !this.hide;
  }
}
