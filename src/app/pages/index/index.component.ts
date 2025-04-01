import { Component } from '@angular/core';
import {IlustratedLinkComponent} from '../../components/ilustrated-link/ilustrated-link.component';
import { ArticleService } from '../../services/article.service';
import { ArticleListItem } from '../../interfaces/article-list-item';

@Component({
  selector: 'app-index',
  imports: [
    IlustratedLinkComponent
  ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {

  mainCharacters?: ArticleListItem[];
  mainLocations?: ArticleListItem[];
  mainMyths?: ArticleListItem[];

  constructor(private articleService: ArticleService) {}
  
  ngOnInit() {
    this.articleService.getMainCharacters().then((mainCharacters: ArticleListItem[]) => {
      this.mainCharacters = mainCharacters;
    });
    this.articleService.getMainLocations().then((mainLocations: ArticleListItem[]) => {
      this.mainLocations = mainLocations;
    });
    this.articleService.getMainMyths().then((mainMyths: ArticleListItem[]) => {
      this.mainMyths = mainMyths;
    });
  }
}
