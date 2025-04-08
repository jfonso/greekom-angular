import { Component, ElementRef, inject, input } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { fromEvent } from 'rxjs';
import { Link } from '../../interfaces/link';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar-dropdown',
  imports: [
    RouterLink
  ],
  templateUrl: './navbar-dropdown.component.html',
  styleUrl: './navbar-dropdown.component.scss'
})
export class NavbarDropdownComponent {
  id = input.required<string>();
  text = input.required<string>();
  links = input.required<Link[]>();
  document = inject(DOCUMENT);
  elementRef = inject(ElementRef);

  showDropdown($event: MouseEvent) {
    $event.preventDefault();
    $event.stopPropagation();
    this.elementRef.nativeElement.querySelector('ul').classList.add('show');
    const subscription = fromEvent(this.document, 'click').subscribe(() => {
      this.elementRef.nativeElement.querySelector('ul').classList.remove('show');
      subscription.unsubscribe();
    })
  }
}
