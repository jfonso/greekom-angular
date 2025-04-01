import { Component } from '@angular/core';
import {InputComponent} from '../../components/input/input.component';
import {ButtonComponent} from '../../components/button/button.component';

@Component({
  selector: 'app-log-in',
  imports: [InputComponent, ButtonComponent],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss'
})
export class LogInComponent {

}
