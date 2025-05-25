import { Component, inject, input } from '@angular/core';
import {InfoLabelComponent} from '../info-label/info-label.component';
import {ProfileFavouriteItemComponent} from '../profile-favourite-item/profile-favourite-item.component';
import {ProfileChangePasswordComponent} from '../profile-change-password/profile-change-password.component';
import { ProfilePersonalComponent } from '../profile-personal/profile-personal.component';
import { ProfileFavoriteComponent } from '../profile-favorite/profile-favorite.component';
import { ArticleService } from '../../services/article.service';
import { ThreadService } from '../../services/thread.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-information',
  imports: [
    InfoLabelComponent,
    ProfileFavouriteItemComponent,
    ProfileChangePasswordComponent,
    ProfilePersonalComponent,
    ProfileFavoriteComponent,
  ],
  templateUrl: './profile-information.component.html',
  styleUrl: './profile-information.component.scss'
})
export class ProfileInformationComponent {
  articleService = inject(ArticleService);
  threadService = inject(ThreadService);
  router = inject(Router);
  activeTab = input('personal');
  favoriteCharacters = this.articleService.getFavoritCharacters;
  favoriteLocations = this.articleService.getFavoritLocations;
  favoriteMyths = this.articleService.getFavoritMyhts;
  favoriteThreads = this.threadService.getFavoriteThreads;

  async removeFavoriteArticle(id: string) {
    this.articleService.removeFromFavorites(id);
  }

  async removeFavoriteThread(id: string) {
    this.threadService.removeFromFavorites(id);
  }

  async navigateToFavoriteArticle(id: string) {
    this.router.navigate([`article/${id}`])
  }

  async navigateToFavoriteThread(id: string) {
    this.router.navigate([`thread/${id}`])
  }
}
