import { Component, effect, inject } from '@angular/core';
import {InputComponent} from '../../components/input/input.component';
import {ButtonComponent} from '../../components/button/button.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-log-in',
  imports: [InputComponent, ButtonComponent, ReactiveFormsModule],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss'
})
export class LogInComponent {

  router = inject(Router);
  userService = inject(UserService);

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
    await this.userService.signInWithEmailAndPassword(this.form.controls.email.value, this.form.controls.password.value);
    this.router.navigate(['/']);
  }
}
