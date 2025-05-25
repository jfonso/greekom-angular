import { Component, effect, inject, signal } from '@angular/core';
import {ButtonComponent} from '../../components/button/button.component';
import { ThreadService } from '../../services/thread.service';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom, map, switchMap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { PostComponent } from '../../components/post/post.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TextareaComponent } from '../../components/textarea/textarea.component';
import { UserService } from '../../services/user.service';
import { IonToast } from '@ionic/angular/standalone';

@Component({
  selector: 'app-thread',
  imports: [
    ButtonComponent,
    PostComponent,
    ModalComponent,
    TextareaComponent,
    ReactiveFormsModule,
    IonToast
  ],
  templateUrl: './thread.component.html',
  styleUrl: './thread.component.scss'
})
export class ThreadComponent {
  threadService = inject(ThreadService);
  route = inject(ActivatedRoute);
  userService = inject(UserService);
  user = this.userService.getCurrentUser;
  threadId$ = this.route.params.pipe(map(params => params['id']));
  thread = toSignal(this.threadId$.pipe(switchMap(id => this.threadService.getThread(id))));
  showModal = signal(false);
  toastMessage = '';
  isToastOpen = false;
  modalForm = new FormGroup({
    content: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(1000),
      ]
    })
  });

  onSubmit() {
    if (this.modalForm.invalid) return;
    this.threadService.createPost(this.user()!.uid, this.thread()!.id, {
      content: this.modalForm.controls.content.value
    });
    this.modalForm.reset();
    this.showModal.set(false);
  }
  isFavorite = toSignal(this.threadId$.pipe(switchMap(id => this.threadService.isFavorite(id))));
  
  async toggleFavorite() {
    let currentThread = this.thread();
    if (!currentThread) return;
    if (!this.isFavorite()) {
      await this.threadService.addToFavorites(currentThread.id);
      this.toastMessage = 'Favorite successfully added';
    } else {
      await this.threadService.removeFromFavorites(currentThread.id);
      this.toastMessage = 'Favorite successfully removed';
    }
    this.isToastOpen = true;
  }

  dismissToast() {
    this.isToastOpen = false;
  }
}
