import { Component, computed, inject, signal } from '@angular/core';
import {ThreadItemComponent} from '../../components/thread-item/thread-item.component';
import {ButtonComponent} from '../../components/button/button.component';
import { ThreadService } from '../../services/thread.service';
import { ModalComponent } from '../../components/modal/modal.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { InputComponent } from '../../components/input/input.component';
import { TextareaComponent } from '../../components/textarea/textarea.component';
import { Router } from '@angular/router';
import { IonToast } from '@ionic/angular/standalone';

@Component({
  selector: 'app-forum',
  imports: [
    ThreadItemComponent,
    ButtonComponent,
    ModalComponent,
    InputComponent,
    TextareaComponent,
    ReactiveFormsModule,
    IonToast
  ],
  templateUrl: './forum.component.html',
  styleUrl: './forum.component.scss'
})
export class ForumComponent {
  router = inject(Router);
  threadService = inject(ThreadService);
  userService = inject(UserService);
  user = this.userService.getCurrentUser;
  threads = this.threadService.getThreads
  showModal = signal(false);
  filterText = signal('');
  toastMessage = '';
  isToastOpen = false;
  filteredThreads = computed(() => {
    const text = this.filterText().toLocaleLowerCase();
    const items = this.threads();
    if (text.length === 0) return items;
    return items?.filter(v => v.content.toLocaleLowerCase().includes(text)||v.creatorName.toLocaleLowerCase().includes(text)||v.title.toLocaleLowerCase().includes(text))
  })
  modalForm = new FormGroup({
    title: new FormControl('',{
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30),
        Validators.pattern(/^[a-zA-Z]/)
      ]
    }),
    content: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(1000),
      ]
    })
  });

  async onSubmit() {
    if (this.modalForm.invalid) return;
    let threadId = await this.threadService.createThread(this.user()!.uid, {
      title: this.modalForm.controls.title.value,
      content: this.modalForm.controls.content.value,
    });
    this.router.navigate([`thread/${threadId}`]);
  }

  showMessage(message: string) {
    this.toastMessage = message;
    this.isToastOpen = true;
  }

  dismissToast() {
    this.isToastOpen = false;
  }
}
