import { Component, inject } from '@angular/core';
import {InputComponent} from '../input/input.component';
import {ButtonComponent} from '../button/button.component';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { IonToast } from '@ionic/angular/standalone';

@Component({
  selector: 'app-profile-change-password',
  imports: [
    InputComponent,
    ButtonComponent,
    ReactiveFormsModule,
    IonToast
  ],
  templateUrl: './profile-change-password.component.html',
  styleUrl: './profile-change-password.component.scss'
})
export class ProfileChangePasswordComponent {
  userService = inject(UserService);
  isToastOpen = false;

  form = new FormGroup({
    password: new FormControl(
      '',
      {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(18),
          this.validateSamePassword
        ]
      }
    ),
    confirmPassword: new FormControl(
      '',
      {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(18),
          this.validateSamePassword
        ]
      }
    )
  });

  private validateSamePassword(control: AbstractControl): ValidationErrors | null {
    if (control.parent === null) return null;
    const password = control.parent!.get('password');
    const confirmPassword = control.parent!.get('confirmPassword');
    return password?.value == confirmPassword?.value ? null : { notSame: true };
  }

  async onSubmit() {
    this.form.controls.password.updateValueAndValidity();
    this.form.controls.confirmPassword.updateValueAndValidity();
    this.form.updateValueAndValidity();
    if(this.form.invalid) return;
    await this.userService.updateUserPassword(this.form.controls.password.value);
    this.isToastOpen = true;
  }

  dismissToast() {
    this.isToastOpen = false;
  }
}
