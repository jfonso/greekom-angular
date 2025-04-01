import { Routes } from '@angular/router';
import {ArticleComponent} from './pages/article/article.component';
import {IndexComponent} from './pages/index/index.component';
import {LogInComponent} from './pages/log-in/log-in.component';

export const routes: Routes = [
  {path: 'index', component: IndexComponent},
  {path: 'article', component: ArticleComponent},
  {path: 'log-in', component: LogInComponent},
];
