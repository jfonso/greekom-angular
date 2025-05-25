import { Component, input, output } from '@angular/core';
import { FavoriteArticle } from '../../interfaces/favorite-article';
import { FavoriteThread } from '../../interfaces/favorite-thread';
import { Timestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-profile-favourite-item',
  imports: [],
  templateUrl: './profile-favourite-item.component.html',
  styleUrl: './profile-favourite-item.component.scss'
})
export class ProfileFavouriteItemComponent {

  favorite = input.required<Partial<FavoriteArticle&FavoriteThread&{updated:Timestamp}>>();
  onNavigate = output<string>()
  onRemove = output<string>();

  onClick(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    const target = event.target as HTMLElement;
    if (target.tagName !== 'BUTTON') {
      this.onNavigate.emit(this.favorite().id!);
      return;
    }
    this.onRemove.emit(this.favorite().id!);
  }
}
