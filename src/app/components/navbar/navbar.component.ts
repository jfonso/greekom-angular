import { Component } from '@angular/core';
import { NavbarLinkComponent } from '../navbar-link/navbar-link.component';

@Component({
  selector: 'app-navbar',
  imports: [ NavbarLinkComponent ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

}
