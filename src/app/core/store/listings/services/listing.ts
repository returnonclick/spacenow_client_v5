import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore'
import { Listing } from '@shared/models/listing';

@Injectable()
export class ListingService {

  // ref: string = `listings`
  ref: string = `listings-camila`
  // ref: string = `tt-listings`

  constructor( public afs: AngularFirestore ) {
  }

  public readAll() {
    return this.afs.collection<Listing>(this.ref).stateChanges()
  }

  public readOne(id: string) {
    return this.afs.collection<Listing>(this.ref, ref => ref.where(`id`, '==', `${id}`)).stateChanges()
  }

  public update(id: string, listing: Partial<Listing>) {
    var data = Object.assign({}, listing)
    return this.afs.collection<Listing>(this.ref).doc(id).update(data)
  }

  public create(listing: Listing) {
    var data = Object.assign({}, listing)
    // const cRef = this.afs.firestore.collection(this.ref).doc()
    data.id = listing.id
    // return this.afs.collection<Listing>(this.ref).doc(cRef.id).set(data)
    return this.afs.collection<Listing>(this.ref).doc(listing.id).set(data)
      .then(() =>{
          return data.id 
      })
      .catch(error =>{
        console.log(error)
      })

  }

  public delete(id: string) {
    return this.afs.collection<Listing>(this.ref).doc(id).delete()
  }

}
