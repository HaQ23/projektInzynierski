import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  UpdateUserRequest,
  UserInfoResponse,
} from '../../../shared/model/api-models';
import { UserService } from '../../service/user.service';
import { MessageResponse, UserResponse } from '../../../auth/models/models';
import { AuthService } from '../../../auth/services/auth.service';
import { Subscription } from 'rxjs';
import { ModalService } from '../../../shared/components/base-modal/modal.service';
import { InfoModalComponent } from '../../../shared/components/info-modal/info-modal.component';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss'],
})
export class UserSettingsComponent implements OnInit {
  userInfoForm: FormGroup;
  passwordForm: FormGroup;
  userInfo: UserInfoResponse | null = null;
  message: string = '';
  hideOldPassword: boolean = true;
  hideNewPassword: boolean = true;
  isUserInfoChanged: boolean = false;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private modalService: ModalService,
    private fb: FormBuilder
  ) {
    this.userInfoForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      address: ['', Validators.required],
    });

    this.passwordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit(): void {
    this.loadUserInfo();
  }

  loadUserInfo(): void {
    this.userService.getUserInfo().subscribe({
      next: (user) => {
        this.userInfo = user;
        this.userInfoForm.patchValue(user);
        this.monitorUserInfoChanges();
      },
      error: (error) => {
        console.error('Błąd podczas ładowania danych użytkownika:', error);
        this.message =
          'Nie udało się załadować informacji o użytkowniku. Spróbuj ponownie później.';
      },
    });
  }

  monitorUserInfoChanges(): void {
    this.userInfoForm.valueChanges.subscribe(() => {
      if (this.userInfo) {
        this.isUserInfoChanged = !this.areFormsEqual(
          this.userInfoForm.value,
          this.userInfo
        );
      }
    });
  }

  areFormsEqual(
    formValue: UpdateUserRequest,
    userInfo: UserInfoResponse
  ): boolean {
    return (
      formValue.email === userInfo.email &&
      formValue.firstname === userInfo.firstname &&
      formValue.lastname === userInfo.lastname &&
      formValue.phoneNumber === userInfo.phoneNumber &&
      formValue.address === userInfo.address
    );
  }

  onUpdateUserInfo(): void {
    if (this.userInfoForm.invalid) {
      return;
    }

    const updateRequest: UpdateUserRequest = this.userInfoForm.value;

    this.userService.updateUserInfo(updateRequest).subscribe({
      next: (response: MessageResponse) => {
        const resultModalRef = this.modalService.openModal(InfoModalComponent);
        resultModalRef.subject.next(
          'Pomyślnie zaktualizowano dane użytkownika.'
        );
        if (this.userInfo) {
          const updatedUser: UserResponse = {
            username: this.userInfo.username,
            email: updateRequest.email,
            firstname: updateRequest.firstname,
            lastname: updateRequest.lastname,
            role: this.userInfo.role,
          };

          this.authService.updateUser(updatedUser);
          this.isUserInfoChanged = false;
        }
      },
      error: (error) => {
        console.error('Błąd podczas aktualizacji danych użytkownika:', error);
        this.message =
          'Nie udało się zaktualizować informacji. Spróbuj ponownie.';
      },
    });
  }

  onChangePassword(): void {
    if (this.passwordForm.invalid) {
      return;
    }
    this.message = '';
    const { oldPassword, newPassword } = this.passwordForm.value;

    this.userService.changePassword(oldPassword, newPassword).subscribe({
      next: (response: MessageResponse) => {
        const resultModalRef = this.modalService.openModal(InfoModalComponent);
        resultModalRef.subject.next('Hasło zostało pomyślnie zmienione.');
        this.passwordForm.reset();
        Object.keys(this.passwordForm.controls).forEach((key) => {
          this.passwordForm.get(key)?.setErrors(null);
        });
      },
      error: (error) => {
        console.error('Błąd podczas zmiany hasła:', error);
        if (
          error.status === 400 &&
          error.error.message === 'Incorrect old password'
        ) {
          this.message = 'Podano nieprawidłowe stare hasło. Spróbuj ponownie.';
        } else {
          this.message = 'Nie udało się zmienić hasła. Spróbuj ponownie.';
        }
      },
    });
  }

  toggleOldPasswordVisibility(): void {
    this.hideOldPassword = !this.hideOldPassword;
  }

  toggleNewPasswordVisibility(): void {
    this.hideNewPassword = !this.hideNewPassword;
  }
}
