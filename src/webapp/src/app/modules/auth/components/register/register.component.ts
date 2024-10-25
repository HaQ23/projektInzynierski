import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  hide = true;
  hideConfirm = true;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group(
      {
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required]],
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        phoneNumber: ['', Validators.required],
        address: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const signUpRequest = {
        username: this.registerForm.value.username,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        firstname: this.registerForm.value.firstname,
        lastname: this.registerForm.value.lastname,
        phoneNumber: this.registerForm.value.phoneNumber,
        address: this.registerForm.value.address,
      };

      this.authService.register(signUpRequest).subscribe({
        next: (response) => {
          this.errorMessage = null;
          this.authService.storePendingActivationSession(signUpRequest.email);
          this.router.navigate(['/auth/activation-account']);
        },
        error: (error) => {
          if (error.status === 400) {
            this.errorMessage =
              'Niepoprawne dane: Email lub nazwa użytkownika już jest zajęta.';
          } else {
            this.errorMessage =
              'Nie udało się zarejestrować. Spróbuj ponownie później.';
          }
        },
      });
    }
  }

  togglePasswordVisibility(event: Event): void {
    event.stopPropagation();
    this.hide = !this.hide;
  }

  toggleConfirmPasswordVisibility(event: Event): void {
    event.stopPropagation();
    this.hideConfirm = !this.hideConfirm;
  }
}
