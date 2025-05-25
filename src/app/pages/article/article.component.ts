import { Component, effect, inject } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { GalleryImageComponent } from '../../components/gallery-image/gallery-image.component';
import { IlustratedLinkComponent } from '../../components/ilustrated-link/ilustrated-link.component';
import { InfoboxSectionComponent } from '../../components/infobox-section/infobox-section.component';
import { firstValueFrom, map, switchMap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { DatabaseService } from '../../services/database.service';
import { IonToast } from '@ionic/angular/standalone';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-article',
  imports: [
    GalleryImageComponent,
    IlustratedLinkComponent,
    InfoboxSectionComponent,
    RouterLink,
    IonToast
  ],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss'
})
export class ArticleComponent {
  articleService = inject(ArticleService);
  databaseService = inject(DatabaseService);
  userService = inject(UserService);
  rotuer = inject(Router);
  route = inject(ActivatedRoute);
  articleId$ = this.route.params.pipe(map(params => params['id']));
  article = toSignal(this.articleId$.pipe(switchMap(id => this.articleService.getArticle(id))));
  isFavorite = toSignal(this.articleId$.pipe(switchMap(id => this.articleService.isFavorite(id))));
  toastMessage = '';
  isToastOpen = false;

  async toggleFavorite() {
    if (!this.userService.getCurrentUser()) {
      this.rotuer.navigate(['/log-in']);
      return;
    }
    let id = await firstValueFrom(this.articleId$);
    if (!this.isFavorite()) {
      this.articleService.addToFavorites(id);
      this.toastMessage = 'Favorite successfully added';
    } else {
      await this.articleService.removeFromFavorites(id);
      this.toastMessage = 'Favorite successfully removed';
    }
    this.isToastOpen = true;
  }

  dismissToast() {
    this.isToastOpen = false;
  }
}
