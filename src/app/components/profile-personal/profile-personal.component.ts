import { Component, effect, inject, OnInit } from '@angular/core';
import { InputComponent } from '../input/input.component';
import { ButtonComponent } from '../button/button.component';
import { UserService } from '../../services/user.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonToast } from '@ionic/angular/standalone';

@Component({
  selector: 'app-profile-personal',
  templateUrl: './profile-personal.component.html',
  imports: [
    InputComponent,
    ButtonComponent,
    ReactiveFormsModule,
    IonToast
  ],
  styleUrls: ['./profile-personal.component.scss'],
})
export class ProfilePersonalComponent {
  userService = inject(UserService);
  user = this.userService.getCurrentUser;
  isToastOpen = false;
  isErrorToastOpen = false;

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
    try {
      await this.userService.updateUserPersonalInformation(this.form.controls.username.value,this.form.controls.email.value);
      this.isErrorToastOpen = false;
      this.isToastOpen = true;
    } catch(error) {
      this.isErrorToastOpen = true;
      this.isToastOpen = false;
    }
  }

  dismissToast() {
    this.isToastOpen = false;
  }

  dismissErrorToast() {
    this.isErrorToastOpen = false;
  }

  constructor() {
    effect(() => {
      this.form.controls.username.setValue(this.user()?.displayName!);
      this.form.controls.email.setValue(this.user()?.email!);
    });
  }
}
