import { Component, output } from '@angular/core';

@Component({
  selector: 'app-profile-menu',
  imports: [],
  templateUrl: './profile-menu.component.html',
  styleUrl: './profile-menu.component.scss'
})
export class ProfileMenuComponent {

  activeTab = 'personal';
  activeTabChange = output<string>()
  showAll = false;


  switchTab(tab: string) {
    this.activeTab = tab;
    this.activeTabChange.emit(tab);
    this.showAll = false;
  }

  toggleShowAll() {
    this.showAll = !this.showAll;
  }
}
