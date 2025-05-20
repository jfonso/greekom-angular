import { Component } from '@angular/core';
import {InfoLabelComponent} from '../info-label/info-label.component';
import {ProfileFavouriteItemComponent} from '../profile-favourite-item/profile-favourite-item.component';
import {ProfileChangePasswordComponent} from '../profile-change-password/profile-change-password.component';

@Component({
  selector: 'app-profile-information',
  imports: [
    InfoLabelComponent,
    ProfileFavouriteItemComponent,
    ProfileChangePasswordComponent
  ],
  templateUrl: './profile-information.component.html',
  styleUrl: './profile-information.component.scss'
})
export class ProfileInformationComponent {

}
