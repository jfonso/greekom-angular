import { Component, input } from '@angular/core';
import { NavbarLinkComponent } from '../navbar-link/navbar-link.component';

@Component({
  selector: 'app-navbar-dropdown',
  imports: [ NavbarLinkComponent ],
  templateUrl: './navbar-dropdown.component.html',
  styleUrl: './navbar-dropdown.component.scss'
})
export class NavbarDropdownComponent {
  idd = input.required<string>();
  text = input.required<string>();
}
