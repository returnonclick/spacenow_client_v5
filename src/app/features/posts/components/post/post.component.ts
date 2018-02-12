import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { PostModel } from '@models/post/post.model';


// ngrx store
import * as postActions from '@store/post/post.actions';
import * as fromRoot from '@store/index';

interface AppState {
  post: PostModel;
}

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  posts: Observable<PostModel[]>;

  constructor(private store: Store<fromRoot.State>) {

    // data slice of store
  }

  ngOnInit() {

    
    // this.store.dispatch(new postActions.LoadPosts());

    this.posts = this.store.select(fromRoot.selectAllPosts);

    // this.posts = this.store.pipe(select(fromRoot.selectAllPosts));
    this.posts.subscribe(data =>{
      if(data) {
        console.log(data);
      }
    })
  }

  getPosts() {
    this.store.dispatch(new postActions.LoadPosts());
  }

  // vote(post: PostModel, val: number) {
  //   this.store.dispatch(new postActions.VoteUpdate({ post, val }));
  // }

}
