import { Component } from '@angular/core';
import {ProfileMenuComponent} from '../../components/profile-menu/profile-menu.component';
import {ProfileInformationComponent} from '../../components/profile-information/profile-information.component';
import {
  ProfileChangePasswordComponent
} from '../../components/profile-change-password/profile-change-password.component';
import {ProfileFavouriteItemComponent} from '../../components/profile-favourite-item/profile-favourite-item.component';

@Component({
  selector: 'app-profile',
  imports: [
    ProfileMenuComponent,
    ProfileInformationComponent,
    ProfileChangePasswordComponent,
    ProfileFavouriteItemComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  activeTab = 'personal';
  activeTabChange(tab: string) {
    this.activeTab = tab;
  }
}
