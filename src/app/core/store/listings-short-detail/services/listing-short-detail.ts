import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore'
import { Observable } from 'rxjs'

import { ListingShortDetail } from '@models/listing-short-detail'


@Injectable()
export class ListingShortDetailService {

  ref: string = `listings-short-detail`

  constructor( public afs: AngularFirestore ) {
  }

  public readAll() {
    return this.afs.collection<ListingShortDetail>(this.ref).valueChanges()
  }

  // filter(params: any[]) {
  //   return Observable.fromPromise(
  //     this.afs.firestore.collection(this.ref)
  //     .where(params[0], params[1], params[2])
  //     .limit(30)
  //     .get()
  //     .then(snapshot => snapshot.docChanges)
  //   )
  // }
}
