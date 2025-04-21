import { Component, Signal, inject } from '@angular/core';
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

  mainCharacters?: Signal<ArticleListItem[] | undefined>;
  mainLocations?: Signal<ArticleListItem[] | undefined>;
  mainMyths?: Signal<ArticleListItem[] | undefined>;

  articleService = inject(ArticleService);
  
  ngOnInit() {
    this.mainCharacters = toSignal(this.articleService.getMainCharacters());
    this.mainLocations = toSignal(this.articleService.getMainLocations());
    this.mainMyths = toSignal(this.articleService.getMainMyths());
  }
}
