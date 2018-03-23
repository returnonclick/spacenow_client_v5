import { Injectable } from '@angular/core'
import { AngularFirestore } from 'angularfire2/firestore'
import { ListingShortDetail } from '@shared/models/listing-short-detail'

@Injectable()
export class ListingShortDetailService {

  ref: string = `listings-short-detail`

  constructor( public afs: AngularFirestore ) {
  }

  public readAll() {
    return this.afs.collection<ListingShortDetail>(this.ref).valueChanges()
  }

}
