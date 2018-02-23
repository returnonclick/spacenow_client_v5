import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore'
import { Amenity } from '@shared/models/amenity';

@Injectable()
export class AmenityService {

  ref: string = `amenities`

  constructor( public afs: AngularFirestore ) {
  }

  public readAll() {
    return this.afs.collection<Amenity>(this.ref).stateChanges()
  }

  public update(id: string, amenity: Partial<Amenity>) {
    var data = Object.assign({}, amenity)
    return this.afs.collection<Amenity>(this.ref).doc(id).update(data)
  }

  public create(amenity: Amenity) {
    var data = Object.assign({}, amenity)
    const cRef = this.afs.firestore.collection(this.ref).doc()
    data.id = cRef.id
    return this.afs.collection<Amenity>(this.ref).doc(cRef.id).set(data)
  }

  public delete(id: string) {
    return this.afs.collection<Amenity>(this.ref).doc(id).delete()
  }

}