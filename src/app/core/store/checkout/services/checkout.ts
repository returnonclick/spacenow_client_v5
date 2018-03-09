import { Injectable } from '@angular/core'
import { AngularFirestore } from 'angularfire2/firestore'
import { Observable } from 'rxjs'

import { Booking } from '@models/booking'

@Injectable()
export class CheckoutService {

  ref: string = 'bookings'

  constructor(
    private _afs: AngularFirestore,
  ) { }

  checkout(booking: Booking) {
    var data   = Object.assign({}, booking)
    const cRef = this._afs.firestore.collection(this.ref).doc()
    data.id    = cRef.id

    return this._afs.collection<Booking>(this.ref).doc(cRef.id).set(data).then(() => data.id)
  }

}
