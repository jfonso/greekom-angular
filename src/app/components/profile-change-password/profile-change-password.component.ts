import { Component, inject } from '@angular/core';
import {InputComponent} from '../input/input.component';
import {ButtonComponent} from '../button/button.component';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile-change-password',
  imports: [
    InputComponent,
    ButtonComponent,
    ReactiveFormsModule
  ],
  templateUrl: './profile-change-password.component.html',
  styleUrl: './profile-change-password.component.scss'
})
export class ProfileChangePasswordComponent {
  userService = inject(UserService);

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
    if(this.form.invalid) return;
    await this.userService.updateUserPassword(this.form.controls.password.value);
  }
}
