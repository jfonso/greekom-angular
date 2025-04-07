import { Component } from '@angular/core';
import {InfoLabelComponent} from '../info-label/info-label.component';

@Component({
  selector: 'app-profile-information',
  imports: [
    InfoLabelComponent
  ],
  templateUrl: './profile-information.component.html',
  styleUrl: './profile-information.component.scss'
})
export class ProfileInformationComponent {

}
