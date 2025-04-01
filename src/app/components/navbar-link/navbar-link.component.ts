import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-navbar-link',
  imports: [],
  templateUrl: './navbar-link.component.html',
  styleUrl: './navbar-link.component.scss'
})
export class NavbarLinkComponent {
  url = input.required<string>();
  text = input.required<string>();
}
