import { Component, input } from '@angular/core';

@Component({
  selector: 'app-gallery-image',
  imports: [],
  templateUrl: './gallery-image.component.html',
  styleUrl: './gallery-image.component.scss'
})
export class GalleryImageComponent {
  url = input.required<string>();
  previewVisible = false;

  showPreview(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.previewVisible) {
      this.hidePreview();
      return;
    }
    this.previewVisible = true;
  }

  hidePreview() {
    this.previewVisible = false;
  }
}
