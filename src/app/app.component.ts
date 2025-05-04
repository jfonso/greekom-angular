import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import {HeaderMobileComponent} from './components/header-mobile/header-mobile.component';

import {NgIf} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, NavbarComponent, FooterComponent, HeaderMobileComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  router = inject(Router);

  title = 'greekom-angular';

  mbMenuVisible = false;
  
  triggerMbMenuToggle() {
    this.mbMenuVisible = !this.mbMenuVisible;
  }

  constructor() {
    this.router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        this.mbMenuVisible = false;
      }
    });
  }
}
