import {Component, Input, input} from '@angular/core';

@Component({
  selector: 'app-info-label',
  imports: [],
  templateUrl: './info-label.component.html',
  styleUrl: './info-label.component.scss'
})
export class InfoLabelComponent {
  @Input() label: string='';
}
