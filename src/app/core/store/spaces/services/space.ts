import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore'
import { Observable } from 'rxjs'

import { Space } from '@models/space'

@Injectable()
export class SpaceService {

  private ref: string = `v4-listings`

  constructor(private afs: AngularFirestore) { }

  readAll() {
    return Observable.fromPromise(
      this.afs.firestore.collection(this.ref).limit(20).get().then(snapshot => snapshot.docChanges)
    )
  }

  select(spaceIds: string[]) {
    return Observable.combineLatest(
      ...spaceIds.map(id =>
        this.afs.doc<Space>(`${this.ref}/${id}`).snapshotChanges()
      )
    )
  }

  filter(params: any[]) {
    return Observable.fromPromise(
      this.afs.firestore.collection(this.ref)
      .where(params[0], params[1], params[2])
      .limit(20)
      .get()
      .then(snapshot => snapshot.docChanges)
    )
  }

}
