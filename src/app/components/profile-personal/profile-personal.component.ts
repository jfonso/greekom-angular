import { Component, effect, inject, OnInit } from '@angular/core';
import { InputComponent } from '../input/input.component';
import { ButtonComponent } from '../button/button.component';
import { UserService } from '../../services/user.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile-personal',
  templateUrl: './profile-personal.component.html',
  imports: [
    InputComponent,
    ButtonComponent,
    ReactiveFormsModule
  ],
  styleUrls: ['./profile-personal.component.scss'],
})
export class ProfilePersonalComponent {
  userService = inject(UserService);
  user = this.userService.getCurrentUser;

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
    )
  });

  async onSubmit() {
    if(this.form.invalid) return;
    await this.userService.updateUserPersonalInformation(this.form.controls.username.value,this.form.controls.email.value);
  }

  constructor() {
    effect(() => {
      this.form.controls.username.setValue(this.user()?.displayName!);
      this.form.controls.email.setValue(this.user()?.email!);
    });
  }
}
