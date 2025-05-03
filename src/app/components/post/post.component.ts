import { Component, input } from '@angular/core';

@Component({
  selector: 'app-post',
  imports: [],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent {
  postId = input.required<string>()
  creatorName = input.required<string>()
  content = input.required<string>()
}
