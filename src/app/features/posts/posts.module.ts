import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, ActionReducerMap } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { PostEffects } from '../../core/store/post/post.effects';
import { reducer } from '../../core/store/post/post.reducer';

import { reducers } from '../../core/store/index';

import { PostsRoutingModule } from './posts-routing.module';
import { PostComponent } from './components/post/post.component';

/* 
 * TT. Feature Module State Composition
 * NgRx Store uses fractal state management, which provides
 * state composition through feature module. `StoreModule.forFeature`
 * defines the name of the feature state and the reducers that make up
 * the state.
 * [See more](https://github.com/ngrx/platform/blob/v4.1.1/docs/store/api.md#feature-module-state-composition)
 *  */

// TT. reducers for Post Module
export const postReducers: ActionReducerMap<any> = {
  post: reducers.post
};

@NgModule({
  imports: [
    CommonModule,
    PostsRoutingModule,

    // ngrx
    EffectsModule.forFeature([PostEffects]),
    StoreModule.forFeature('post', postReducers),
    StoreDevtoolsModule.instrument({ maxAge: 25 })
  ],
  declarations: [PostComponent]
})

export class PostsModule { }

