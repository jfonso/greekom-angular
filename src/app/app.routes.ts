import { Routes } from '@angular/router';
import {ArticleComponent} from './pages/article/article.component';
import {IndexComponent} from './pages/index/index.component';
import {LogInComponent} from './pages/log-in/log-in.component';
import {SignUpComponent} from './pages/sign-up/sign-up.component';
import {ForumComponent} from './pages/forum/forum.component';
import {ThreadComponent} from './pages/thread/thread.component';
import {ProfileComponent} from './pages/profile/profile.component';

export const routes: Routes = [
  {path: '', component: IndexComponent},
  {path: 'article/:id', component: ArticleComponent},
  {path: 'log-in', component: LogInComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'forum', component: ForumComponent},
  {path: 'thread', component: ThreadComponent},
  {path: 'profile', component: ProfileComponent},
];
