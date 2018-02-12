import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostComponent } from './components/post/post.component';

const postsRoutes: Routes = [
  {
    path: '',
    component: PostComponent,
  }

];

export const PostsRoutingModule: ModuleWithProviders = RouterModule.forChild(postsRoutes);
