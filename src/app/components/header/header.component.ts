import { Component, output } from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  triggerMbMenuToggle = output();

  mbMenuToggle(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.triggerMbMenuToggle.emit()
  }
}
