import { Component, ElementRef, inject, input } from '@angular/core';
import { ArticleListItem } from '../../interfaces/article-list-item';
import { DOCUMENT } from '@angular/common';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-navbar-dropdown',
  imports: [],
  templateUrl: './navbar-dropdown.component.html',
  styleUrl: './navbar-dropdown.component.scss'
})
export class NavbarDropdownComponent {
  id = input.required<string>();
  text = input.required<string>();
  listItems = input.required<ArticleListItem[]>();
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
