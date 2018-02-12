import { Injectable } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database'

import { Observable } from 'rxjs/Observable';

import { PostModel } from '../../../shared/models/post/post.model';

@Injectable()
export class PostService {

  constructor(private db: AngularFireDatabase) { }

  getPosts(): Observable<any[]> {
    return this.db.list('/posts').valueChanges(); 
  } 

}
