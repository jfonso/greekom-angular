import { Component, input } from '@angular/core';

@Component({
  selector: 'app-gallery-image',
  imports: [],
  templateUrl: './gallery-image.component.html',
  styleUrl: './gallery-image.component.scss'
})
export class GalleryImageComponent {
  url = input.required<string>();
}
