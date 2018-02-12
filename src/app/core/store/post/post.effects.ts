import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { PostService } from './post.service';
import * as postActions from './post.actions';
export type Action = postActions.PostActions;

import { PostModel } from '@models/post/post.model';

@Injectable()
export class PostEffects {

  constructor(
    private actions: Actions,
    private postService: PostService
  ) {}


  @Effect()
  loadPosts: Observable<Action> = this.actions.ofType(postActions.PostActionTypes.LoadPosts)
    .switchMap(() => {
       return this.postService.getPosts()
       .map(data => { return new postActions.LoadPostsSuccess({ posts: data }) })
    })
}
