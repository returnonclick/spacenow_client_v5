import { Component } from '@angular/core'
import { Dictionary } from '@ngrx/entity/src/models'
import { Store } from '@ngrx/store'

import { Booking, BookingStatus } from '@models/booking'
import { ListingShortDetail } from '@models/listing-short-detail'
import { User } from '@models/user'

import * as fromRoot from '@core/store'
import * as bookingActions from '@core/store/bookings/actions/booking'
import * as spaceActions from '@core/store/spaces/actions/space'

@Component({
  selector: 'sn-manage-bookings',
  templateUrl: './manage-bookings.component.html',
  styleUrls: [ './manage-bookings.component.scss' ],
})
export class ManageBookingsComponent {

  bookings: Booking[]
  spaces:   Dictionary<ListingShortDetail>
  user:     User

  constructor(private _store: Store<fromRoot.State>) {
    let bookings$ = this._store.select(fromRoot.getAllBookings)
    let spaces$   = this._store.select(fromRoot.getSpaceEntities)
    let user$     = this._store.select(fromRoot.getAuthUser)

    bookings$.subscribe(bookings => {
      if(bookings) {
        this.bookings = bookings
        this._store.dispatch(new spaceActions.Select(
          this.bookings.map(booking => booking.spaceId),
          true,
        ))
      }
    })
    spaces$.subscribe(spaces => {
      if(spaces)
        this.spaces = spaces as Dictionary<ListingShortDetail>
    })
    user$.subscribe(user => {
      if(user) {
        this.user = user
        this._store.dispatch(new bookingActions.Query(user.uid))
      }
    })
  }

  canCheckout(booking: Booking) {
    return booking.bookingStatus == BookingStatus.APPROVED
      || booking.bookingStatus == BookingStatus.BOOKED
  }

  viewSpace(spaceId: string) {
    window.open(`/space/${spaceId}`)
  }

  checkoutBooking(bookingId: string) {
    window.open(`/users/checkout/${bookingId}`)
  }

}
