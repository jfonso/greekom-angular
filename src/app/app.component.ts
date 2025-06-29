import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import {IonApp, IonContent, IonHeader} from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, NavbarComponent, FooterComponent, IonContent, IonApp, IonHeader],
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
