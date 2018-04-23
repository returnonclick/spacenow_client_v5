import { Injectable } from '@angular/core'
import { AngularFirestore } from 'angularfire2/firestore'
import { Observable } from 'rxjs'

import { Space } from '@models/space'
import { ListingShortDetail } from '@models/listing-short-detail'

@Injectable()
export class SpaceService {

  private _ref:      string = `listings` // TODO: change to appropriate path
  private _shortRef: string = `listings-short-detail`

  constructor(private afs: AngularFirestore) { }

  readAll() {
    return Observable.fromPromise(
      this.afs.firestore.collection(this._ref).get().then(snapshot => snapshot.docChanges)
    )
  }

  select(spaceIds: string[], isShort: boolean) {
    return Observable.combineLatest(
      ...spaceIds.map(id => {
        if(!isShort)
          return this.afs.doc<Space>(`${this._ref}/${id}`).snapshotChanges()
        else
          return this.afs.doc<ListingShortDetail>(`${this._shortRef}/${id}`).snapshotChanges()
      })
    )
  }

  filter(params: any[]) {
    return Observable.fromPromise(
      this.afs.firestore.collection(this._ref)
      .where(params[0], params[1], params[2])
      .get()
      .then(snapshot => snapshot.docChanges)
    )
  }

}
