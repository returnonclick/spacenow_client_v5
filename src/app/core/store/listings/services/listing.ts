import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore'
import { Listing } from '@shared/models/listing';

@Injectable()
export class ListingService {

  ref: string = `listings`

  constructor( public afs: AngularFirestore ) {
  }

  public readAll() {
    return this.afs.collection<Listing>(this.ref).stateChanges()
  }

  public update(id: string, listing: Partial<Listing>) {
    var data = Object.assign({}, listing)
    return this.afs.collection<Listing>(this.ref).doc(id).update(data)
  }

  public create(listing: Listing) {
    var data = Object.assign({}, listing)
    const cRef = this.afs.firestore.collection(this.ref).doc()
    data.id = cRef.id
    return this.afs.collection<Listing>(this.ref).doc(cRef.id).set(data)
  }

  public delete(id: string) {
    return this.afs.collection<Listing>(this.ref).doc(id).delete()
  }

}