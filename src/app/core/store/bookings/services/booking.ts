import { Injectable } from '@angular/core'
import { AngularFirestore } from 'angularfire2/firestore'
import { Observable } from 'rxjs'

import { Booking, BookingStatus } from '@models/booking'

@Injectable()
export class BookingService {

  ref: string = '/bookings-errol'

  constructor(private _afs: AngularFirestore) { }

  query(userId: string) {
    return this._afs.collection<Booking>(this.ref, ref =>
      ref.where('userId', '==', userId)
    ).stateChanges()
  }

  select(bookingId: string) {
    return this._afs.doc<Booking>(`${this.ref}/${bookingId}`).snapshotChanges()
  }

  filter(spaceIds: string[], status: BookingStatus) {
    return Observable.merge(
      ...spaceIds.map(id =>
        this._afs.collection<Booking>(this.ref, ref =>
          ref.where('spaceId', '==', id)
            .where('bookingStatus', '==', status)
        ).stateChanges()
      )
    )
  }

  book(booking: Booking) {
    var data   = JSON.parse(JSON.stringify(booking))
    const dRef = this._afs.firestore.collection(this.ref).doc()
    data.id    = dRef.id

    return dRef.set(data)
  }

  modifyBooking(bookingId: string, status: BookingStatus.APPROVED | BookingStatus.DECLINED) {
    let dRef = this._afs.firestore.doc(`${this.ref}/${bookingId}`)

    return dRef.update({
      bookingStatus: status
    })
  }

  checkout(booking: Booking) {
    var data   = JSON.parse(JSON.stringify(booking))
    const dRef = this._afs.firestore.doc(`${this.ref}/${booking.id}`)

    return dRef.set(data)
      .then(() => booking.id)
  }

}
