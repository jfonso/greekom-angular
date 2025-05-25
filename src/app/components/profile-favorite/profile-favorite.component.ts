import { Component, input, output } from '@angular/core';
import { ProfileFavouriteItemComponent } from '../profile-favourite-item/profile-favourite-item.component';
import { FavoriteArticle } from '../../interfaces/favorite-article';
import { FavoriteThread } from '../../interfaces/favorite-thread';
import { Timestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-profile-favorite',
  templateUrl: './profile-favorite.component.html',
  imports: [
    ProfileFavouriteItemComponent
  ],
  styleUrls: ['./profile-favorite.component.scss'],
})
export class ProfileFavoriteComponent {
  favorites = input.required<Partial<FavoriteArticle&FavoriteThread&{updated:Timestamp}>[]>();
  onRemove = output<string>();
  onNavigate = output<string>();
  removeFavorite(id: string) {
    this.onRemove.emit(id);
  }
  navigateToFavorite(id: string) {
    this.onNavigate.emit(id);
  }
}
