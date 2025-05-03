import { Component, inject, input } from '@angular/core';
import { NavbarLinkComponent } from '../navbar-link/navbar-link.component';
import { ArticleService } from '../../services/article.service';
import { ArticleListItem } from '../../interfaces/article-list-item';
import { NavbarDropdownComponent } from '../navbar-dropdown/navbar-dropdown.component';
import { User } from '@angular/fire/auth';
import { Link } from '../../interfaces/link';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-navbar',
  imports: [ NavbarLinkComponent, NavbarDropdownComponent ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  userService = inject(UserService);

  user = this.userService.getCurrentUser;
  route = inject(ActivatedRoute);

  articleService = inject(ArticleService);

  charactersLinks = this.articleService.getCharacters;
  locationsLinks = this.articleService.getLocations;
  mythsLinks = this.articleService.getMyths;

  toLinks(items: ArticleListItem[]): Link[] {
    return items.map(item => ({url:['/article',item.id],text:item.name}));
  }

}
