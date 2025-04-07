import { Component } from '@angular/core';
import {InputComponent} from '../input/input.component';
import {ButtonComponent} from '../button/button.component';

@Component({
  selector: 'app-profile-change-password',
  imports: [
    InputComponent,
    ButtonComponent
  ],
  templateUrl: './profile-change-password.component.html',
  styleUrl: './profile-change-password.component.scss'
})
export class ProfileChangePasswordComponent {

}
