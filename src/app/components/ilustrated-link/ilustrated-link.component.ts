import { Component, computed, input } from '@angular/core';
import {RouterLink} from '@angular/router';
import { ArticleListItem } from '../../interfaces/article-list-item';

@Component({
  selector: 'app-ilustrated-link',
  imports: [
    RouterLink
  ],
  templateUrl: './ilustrated-link.component.html',
  styleUrl: './ilustrated-link.component.scss'
})
export class IlustratedLinkComponent {
  item = input.required<ArticleListItem>();

  link = computed(() => `/article/${this.item().id}`);
  text = computed(() => this.item().name);
  imageUrl = computed(() => this.item().image_url);
}
