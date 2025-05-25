import { Component, effect, inject } from '@angular/core';
import {InputComponent} from '../../components/input/input.component';
import {ButtonComponent} from '../../components/button/button.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { IonToast } from '@ionic/angular/standalone';

@Component({
  selector: 'app-log-in',
  imports: [InputComponent, ButtonComponent, ReactiveFormsModule, IonToast],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss'
})
export class LogInComponent {

  router = inject(Router);
  userService = inject(UserService);
  isToastOpen = false;

  form = new FormGroup({
    email: new FormControl('',{
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.email,
        Validators.maxLength(64)
      ]
    }),
    password: new FormControl('',{
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(26)
      ]
    })
  })

  async onSubmit() {
    if (this.form.invalid) return;
    try {
      await this.userService.signInWithEmailAndPassword(this.form.controls.email.value, this.form.controls.password.value);
      this.router.navigate(['/']);
    } catch(error) {
      this.isToastOpen = true
    }
  }

  dismissToast() {
    this.isToastOpen = false;
  }
}
