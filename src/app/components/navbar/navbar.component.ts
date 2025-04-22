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

  articleService = inject(ArticleService);

  charactersLinks = this.articleService.getCharacters;
  locationsLinks = this.articleService.getLocations;
  mythsLinks = this.articleService.getMyths;

  toLinks(items: ArticleListItem[]): Link[] {
    return items.map(item => ({url:['/article',item.id],text:item.name}));
  }

}
