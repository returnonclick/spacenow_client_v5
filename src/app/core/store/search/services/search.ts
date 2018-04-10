import { Injectable } from '@angular/core'
import { AngularFirestore } from 'angularfire2/firestore'
import { Observable } from 'rxjs'
import { } from 'googlemaps'

import * as firebase from 'firebase/app'

import { ListingShortDetail } from '@shared/models/listing-short-detail'

@Injectable()
export class SearchService {

  ref: string = `listings-short-detail`

  constructor(private _afs: AngularFirestore) { }

  public query(params: any = null) {
    return this._afs.collection<ListingShortDetail>(this.ref)
      .valueChanges()
      .map(listings =>
        listings.filter(listing => {
            if(listing.status === 'active') {
              let p1 = new google.maps.LatLng(+params.latitude, +params.longitude)
              let p2 = new google.maps.LatLng(listing.geopoint.latitude, listing.geopoint.longitude)
              return this.distBetween(p1, p2) <= (params.radius * 1000)
            }
          }
        )
      )
  }

  public distBetween(p1: google.maps.LatLng, p2: google.maps.LatLng) {
    return google.maps.geometry.spherical.computeDistanceBetween(p1, p2)
  }

}
