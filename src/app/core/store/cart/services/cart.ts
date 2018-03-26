import { Injectable } from '@angular/core'
import { AngularFirestore } from 'angularfire2/firestore'
import { Observable } from 'rxjs'

import { BookingRequest } from '@models/booking'

@Injectable()
export class CartService {

  requestRef: string = 'bookingRequests'

  constructor(
    private _afs: AngularFirestore
  ) { }

  request(request: BookingRequest) {
    var data   = JSON.parse(JSON.stringify(request)) // deep clone because Object.assign does not work
    const cRef = this._afs.firestore.collection(this.requestRef).doc()
    data.id    = cRef.id

    return this._afs.collection<BookingRequest>(this.requestRef).doc(cRef.id).set(data).then(() => data.id)
  }

}
