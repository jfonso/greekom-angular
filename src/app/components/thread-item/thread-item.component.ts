import { Component, computed, input } from '@angular/core';
import { Thread } from '../../interfaces/thread';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-thread-item',
  imports: [RouterLink],
  templateUrl: './thread-item.component.html',
  styleUrl: './thread-item.component.scss'
})
export class ThreadItemComponent {
  title = input.required<string>();
  lastUpdated = input.required<string>();
  threadId = input.required<string>();
  url = computed(() => `/thread/${this.threadId()}`);
  creatorName = input.required<string>();
}
