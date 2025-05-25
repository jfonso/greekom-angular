import { Component, effect, inject } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { GalleryImageComponent } from '../../components/gallery-image/gallery-image.component';
import { IlustratedLinkComponent } from '../../components/ilustrated-link/ilustrated-link.component';
import { InfoboxSectionComponent } from '../../components/infobox-section/infobox-section.component';
import { firstValueFrom, map, switchMap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-article',
  imports: [
    GalleryImageComponent,
    IlustratedLinkComponent,
    InfoboxSectionComponent,
    RouterLink
  ],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss'
})
export class ArticleComponent {
  articleService = inject(ArticleService);
  databaseService = inject(DatabaseService);
  route = inject(ActivatedRoute);
  articleId$ = this.route.params.pipe(map(params => params['id']));
  article = toSignal(this.articleId$.pipe(switchMap(id => this.articleService.getArticle(id))));
  isFavorite = toSignal(this.articleId$.pipe(switchMap(id => this.articleService.isFavorite(id))));

  async toggleFavorite() {
    let id = await firstValueFrom(this.articleId$);
    let article = this.article()!;
    if (!this.isFavorite()) {
      this.articleService.addToFavorites({id,title:article.title,image_url:article.articleImage});
    } else {
      this.articleService.removeFromFavorites(id);
    }
  }
}
