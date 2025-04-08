import { Component, input } from '@angular/core';

@Component({
  selector: 'app-infobox-section',
  imports: [],
  templateUrl: './infobox-section.component.html',
  styleUrl: './infobox-section.component.scss'
})
export class InfoboxSectionComponent {
  header = input.required<string>()
  content = input.required<string>()
}
