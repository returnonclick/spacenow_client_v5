import { Injectable } from '@angular/core'
import { AngularFirestore } from 'angularfire2/firestore'
import { Observable } from 'rxjs'
import { map, switchMap } from 'rxjs/operators'

import { ListingStatus, Space } from '@models/space'
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
        .then(changes => changes.map(change =>
          (change.doc.data() as Space).id)
        )
    )
  }

  related(spaceId: string) {
    return this.afs.doc(`${this._ref}/${spaceId}`)
      .snapshotChanges()
      .pipe(
        map(change => (change.payload.data() as Space).categoryId),
        switchMap(categoryId =>
          this.afs.collection<Space>(this._ref, ref =>
            ref.where('categoryId', '==', categoryId)
              .where('status', '==', ListingStatus.ACTIVE)
          ).stateChanges()
        ),
        map(actions =>
          actions.map(action => (action.payload.doc.data() as Space).id)
            .filter(id => id != spaceId)
            .slice(0, 20)
        ),
        switchMap(spaceIds => Observable.merge(
          ...spaceIds.map(id =>
            this.afs.doc<ListingShortDetail>(`${this._shortRef}/${id}`)
              .snapshotChanges()
          )
        )),
      )
  }

}
