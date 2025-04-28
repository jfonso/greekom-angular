import { Component, inject } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { Article } from '../../interfaces/article';
import { ActivatedRoute } from '@angular/router';
import { GalleryImageComponent } from '../../components/gallery-image/gallery-image.component';
import { IlustratedLinkComponent } from '../../components/ilustrated-link/ilustrated-link.component';
import { InfoboxSectionComponent } from '../../components/infobox-section/infobox-section.component';
import { map, switchMap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-article',
  imports: [
    GalleryImageComponent,
    IlustratedLinkComponent,
    InfoboxSectionComponent
  ],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss'
})
export class ArticleComponent {
  articleService = inject(ArticleService);
  route = inject(ActivatedRoute);
  articleId$ = this.route.params.pipe(map(params => params['id']));
  article = toSignal(this.articleId$.pipe(switchMap(id => this.articleService.getArticle(id))));
}
