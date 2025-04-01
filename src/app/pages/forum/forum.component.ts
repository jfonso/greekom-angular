import { Component } from '@angular/core';
import {ThreadItemComponent} from '../../components/thread-item/thread-item.component';
import {ButtonComponent} from '../../components/button/button.component';

@Component({
  selector: 'app-forum',
  imports: [
    ThreadItemComponent,
    ButtonComponent
  ],
  templateUrl: './forum.component.html',
  styleUrl: './forum.component.scss'
})
export class ForumComponent {

}
