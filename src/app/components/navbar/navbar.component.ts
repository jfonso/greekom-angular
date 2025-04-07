import { Component, inject, input } from '@angular/core';
import { NavbarLinkComponent } from '../navbar-link/navbar-link.component';
import { ArticleService } from '../../services/article.service';
import { ArticleListItem } from '../../interfaces/article-list-item';
import { NavbarDropdownComponent } from '../navbar-dropdown/navbar-dropdown.component';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-navbar',
  imports: [ NavbarLinkComponent, NavbarDropdownComponent ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  user = input<User|null>(null);

  charactersList: ArticleListItem[] = [];
  locationsList: ArticleListItem[] = [];
  mythsList: ArticleListItem[] = [];

  articleService = inject(ArticleService);
  
  ngOnInit() {
    this.articleService.getCharacters().then((charactersList: ArticleListItem[]) => {
      this.charactersList = charactersList;
    });
    this.articleService.getLocations().then((locationsList: ArticleListItem[]) => {
      this.locationsList = locationsList;
    });
    this.articleService.getMyths().then((mythsList: ArticleListItem[]) => {
      this.mythsList = mythsList;
    });
  }

}
