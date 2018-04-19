import { Injectable } from '@angular/core'
import { AngularFirestore } from 'angularfire2/firestore'

import { Booking } from '@models/booking'

@Injectable()
export class BookingService {

  ref: string = '/bookings-errol'

  constructor(private _afs: AngularFirestore) { }

  query(userId: string) {
    return this._afs.firestore.collection(`${this.ref}`)
      .where('userId', '==', userId)
      .get()
      .then(snapshot => snapshot.docChanges)
  }

  select(bookingId: string) {
    return this._afs.doc<Booking>(`${this.ref}/${bookingId}`).snapshotChanges()
  }

  book(booking: Booking) {
    var data   = JSON.parse(JSON.stringify(booking))
    const dRef = this._afs.firestore.collection(`${this.ref}`).doc()
    data.id    = dRef.id

    return dRef.set(data)
  }

  checkout(booking: Booking) {
    var data   = JSON.parse(JSON.stringify(booking))
    const dRef = this._afs.firestore.doc(`${this.ref}/${booking.id}`)

    return dRef.set(data)
      .then(() => booking.id)
  }

}
