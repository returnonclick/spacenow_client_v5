import { Injectable } from '@angular/core'
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore'
import { Observable } from 'rxjs'
import { of } from 'rxjs/observable/of'

import * as firebase from 'firebase/app'

import { ListingShortDetail } from '@shared/models/listing-short-detail'

@Injectable()
export class SearchService {

  ref: string = `listings` // change for listing-short-details in store as well
  
  constructor(private _afs: AngularFirestore) { }

  public query(params: any = null) {

    var data = firebase.firestore().collection("listings").where('status', '==', 'active')

    if( params.categoryId ) { data = data.where('categoryId', '==', params.categoryId) }
    if( params.minPrice ) { data = data.where('price.price', '>=', +params.minPrice) }
    if( params.maxPrice ) { data = data.where('price.price', '<=', +params.maxPrice) }
    if( params.country ) { data = data.where('address.country', '==', params.country) }
    if( params.locality ) { data = data.where('address.locality', '==', params.locality) }
    if( params.street ) { data = data.where('address.route', '==', params.street) }
    data = data.limit(10)
    
    return data.get().then( snapshot => {
      if(snapshot.docs.length > 0) 
        return snapshot.docChanges
      else 
        return of(null)
    })

  }
}
