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
    let aus = this.afs.collection<ListingShortDetail>(this.ref, ref => ref.where('countryName', '==', 'Australia').where('status', '==', 'active').limit(30)).valueChanges()
    let nz = this.afs.collection<ListingShortDetail>(this.ref, ref => ref.where('countryName', '==', 'New Zealand').where('status', '==', 'active').limit(30)).valueChanges()
    let uae = this.afs.collection<ListingShortDetail>(this.ref, ref => ref.where('countryName', '==', 'United Arab Emirates').where('status', '==', 'active').limit(30)).valueChanges()
    return Observable.merge(aus, uae, nz)
  }
}
