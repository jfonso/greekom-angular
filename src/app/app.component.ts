import { CUSTOM_ELEMENTS_SCHEMA, Component, EnvironmentInjector, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import {HeaderMobileComponent} from './components/header-mobile/header-mobile.component';

import {NgIf} from '@angular/common';
import { IonApp, IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, NavbarComponent, FooterComponent, HeaderMobileComponent, NgIf, IonContent, IonApp],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent {

  public enviromentInjector = inject(EnvironmentInjector);

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
