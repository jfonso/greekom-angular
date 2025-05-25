import { Component, inject, input } from '@angular/core';
import {ProfileChangePasswordComponent} from '../profile-change-password/profile-change-password.component';
import { ProfilePersonalComponent } from '../profile-personal/profile-personal.component';
import { ProfileFavoriteComponent } from '../profile-favorite/profile-favorite.component';
import { ArticleService } from '../../services/article.service';
import { ThreadService } from '../../services/thread.service';
import { Router } from '@angular/router';
import { IonToast } from '@ionic/angular/standalone';

@Component({
  selector: 'app-profile-information',
  imports: [
    ProfileChangePasswordComponent,
    ProfilePersonalComponent,
    ProfileFavoriteComponent,
    IonToast
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
  isToastOpen = false;

  async removeFavoriteArticle(id: string) {
    await this.articleService.removeFromFavorites(id);
    this.isToastOpen = true;
  }

  async removeFavoriteThread(id: string) {
    await this.threadService.removeFromFavorites(id);
    this.isToastOpen = true;
  }

  async navigateToFavoriteArticle(id: string) {
    this.router.navigate([`article/${id}`]);
  }

  async navigateToFavoriteThread(id: string) {
    this.router.navigate([`thread/${id}`]);
  }

  dismissToast() {
    this.isToastOpen = false;
  }
}
