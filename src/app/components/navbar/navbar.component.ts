import { Component, inject, input } from '@angular/core';
import { NavbarLinkComponent } from '../navbar-link/navbar-link.component';
import { ArticleService } from '../../services/article.service';
import { ArticleListItem } from '../../interfaces/article-list-item';
import { NavbarDropdownComponent } from '../navbar-dropdown/navbar-dropdown.component';
import { User } from '../../interfaces/user';
import { Link } from '../../interfaces/link';

@Component({
  selector: 'app-navbar',
  imports: [ NavbarLinkComponent, NavbarDropdownComponent ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  user = input<User|null>(null);

  charactersLinks: Link[] = [];
  locationsLinks: Link[] = [];
  mythsLinks: Link[] = [];

  articleService = inject(ArticleService);
  
  ngOnInit() {
    this.articleService.getCharacters().then((charactersList: ArticleListItem[]) => {
      this.charactersLinks = charactersList.map(item => ({url:['/article',item.id],text:item.name}));
    });
    this.articleService.getLocations().then((locationsList: ArticleListItem[]) => {
      this.locationsLinks = locationsList.map(item => ({url:['/article',item.id],text:item.name}));
    });
    this.articleService.getMyths().then((mythsList: ArticleListItem[]) => {
      this.mythsLinks = mythsList.map(item => ({url:['/article',item.id],text:item.name}));
    });
  }

}
