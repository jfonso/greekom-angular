import { Component, Signal, effect, inject } from '@angular/core';
import {IlustratedLinkComponent} from '../../components/ilustrated-link/ilustrated-link.component';
import { ArticleService } from '../../services/article.service';
import { ArticleListItem } from '../../interfaces/article-list-item';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-index',
  imports: [
    IlustratedLinkComponent
  ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {

  articleService = inject(ArticleService);

  mainCharacters = this.articleService.getMainCharacters;
  mainLocations = this.articleService.getMainLocations;
  mainMyths = this.articleService.getMainMyths;
}
