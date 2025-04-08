import { Component, inject } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { Article } from '../../interfaces/article';
import { ActivatedRoute } from '@angular/router';
import { GalleryImageComponent } from '../../components/gallery-image/gallery-image.component';
import { IlustratedLinkComponent } from '../../components/ilustrated-link/ilustrated-link.component';
import { InfoboxSectionComponent } from '../../components/infobox-section/infobox-section.component';

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
  article?: Article;

  ngOnInit() {
    this.articleService.getArticle(this.route.snapshot.params['id']).then(article => this.article = article);
  }
}
