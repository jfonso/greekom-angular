import { Component } from '@angular/core';
import {ProfileMenuComponent} from '../../components/profile-menu/profile-menu.component';
import {ProfileInformationComponent} from '../../components/profile-information/profile-information.component';

@Component({
  selector: 'app-profile',
  imports: [
    ProfileMenuComponent,
    ProfileInformationComponent,
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
