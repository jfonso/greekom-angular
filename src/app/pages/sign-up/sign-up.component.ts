import { Component, inject } from '@angular/core';
import {InputComponent} from '../../components/input/input.component';
import {ButtonComponent} from '../../components/button/button.component';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-sign-up',
  imports: [
    InputComponent,
    ButtonComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {

  router = inject(Router);
  userService = inject(UserService);

  form = new FormGroup({
    email: new FormControl(
      '',
      {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.email,
          Validators.maxLength(64)
        ]
      }
    ),
    username: new FormControl(
      '',
      {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.pattern(/^[a-zA-Z][a-zA-Z0-9_]+$/),
          Validators.minLength(6),
          Validators.maxLength(26)
        ]
      }
    ),
    password: new FormControl(
      '',
      {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(18)
        ]
      }
    ),
    confirmPassword: new FormControl(
      '',
      [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(18)
      ]
    )
  },{validators:[this.validateSamePassword]});

  private validateSamePassword(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    return password?.value == confirmPassword?.value ? null : { notSame: true };
  }

  async onSubmit() {
    if(this.form.invalid) return;
    await this.userService.createUser({
      username: this.form.controls.username.value,
      email: this.form.controls.email.value,
      password: this.form.controls.password.value
    });
    this.router.navigate(['log-in']);
  }
}
