import { Injectable } from '@angular/core'
import { Store } from '@ngrx/store'
import { AngularFirestore } from 'angularfire2/firestore'
import { Observable } from 'rxjs'
import * as firebase from 'firebase/app'

import { ListingShortDetail } from '@shared/models/listing-short-detail'

import * as fromRoot from '@core/store'
import * as  geohash from 'ngeohash'

@Injectable()
export class SearchService {

  ref: string = `listings-short-detail`
  geopoint: firebase.firestore.GeoPoint

  constructor(
    public afs: AngularFirestore,
    public store: Store<fromRoot.State>
  ) {}

  public query(params: any = null) {

    return this.afs.collection<ListingShortDetail>(this.ref).valueChanges().map(
      listings => listings.filter(
        listing => this.distFrom(+params.latitude, +params.longitude, listing.geopoint.latitude, listing.geopoint.longitude) < params.radius
      )
    )

  }

  public distFrom(lat1, lng1, lat2, lng2) {
    let earthRadius = 6371; // miles (or 6371.0 kilometers)
    let dLat = (lat2-lat1) * Math.PI / 180;
    let dLng = (lng2-lng1) * Math.PI / 180;
    let sindLat = Math.sin(dLat / 2);
    let sindLng = Math.sin(dLng / 2);
    let a = Math.pow(sindLat, 2) + Math.pow(sindLng, 2)
            * Math.cos(lat1 * Math.PI / 180 ) * Math.cos(lat2 * Math.PI / 180);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    let dist = earthRadius * c;

    return dist;
    }

}
