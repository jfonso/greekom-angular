import { Component, computed, effect, inject, input } from '@angular/core';
import { Thread } from '../../interfaces/thread';
import { RouterLink } from '@angular/router';
import { ThreadService } from '../../services/thread.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-thread-item',
  imports: [RouterLink],
  templateUrl: './thread-item.component.html',
  styleUrl: './thread-item.component.scss'
})
export class ThreadItemComponent {
  threadService = inject(ThreadService)
  title = input.required<string>();
  lastUpdated = input.required<string>();
  threadId = input.required<string>();
  url = computed(() => `/thread/${this.threadId()}`);
  creatorName = input.required<string>();
  isFavorite = toSignal(toObservable(this.threadId).pipe(switchMap(id => this.threadService.isFavorite(id))));
  
  async toggleFavorite() {
    let id = this.threadId();
    if (!this.isFavorite()) {
      this.threadService.addToFavorites(id,this.title());
    } else {
      this.threadService.removeFromFavorites(id);
    }
  }
}
