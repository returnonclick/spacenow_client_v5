import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore'
import { ListingSpecification } from '@shared/models/listing-specification';

@Injectable()
export class ListingSpecificationService {

  ref: string = `listing-specifications`

  constructor( public afs: AngularFirestore ) {
  }

  public readAll() {
    return this.afs.collection<ListingSpecification>(this.ref).stateChanges()
  }

  public update(id: string, listingSpecification: Partial<ListingSpecification>) {
    var data = Object.assign({}, listingSpecification)
    return this.afs.collection<ListingSpecification>(this.ref).doc(id).update(data)
  }

  public create(listingSpecification: ListingSpecification) {
    var data = Object.assign({}, listingSpecification)
    const cRef = this.afs.firestore.collection(this.ref).doc()
    data.id = cRef.id
    return this.afs.collection<ListingSpecification>(this.ref).doc(cRef.id).set(data)
  }

  public delete(id: string) {
    return this.afs.collection<ListingSpecification>(this.ref).doc(id).delete()
  }

}