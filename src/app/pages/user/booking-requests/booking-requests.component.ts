import { Component, ChangeDetectorRef } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { MatSnackBar } from '@angular/material'
import { Store } from '@ngrx/store'
import { Dictionary } from '@ngrx/entity/src/models'
import { Observable, Subject } from 'rxjs'

import 'rxjs/add/operator/combineLatest'
import 'rxjs/add/operator/startWith'
import 'rxjs/add/operator/takeUntil'

import * as moment from 'moment'

import { Booking } from '@models/booking'
import { Space } from '@models/space'
import { User } from '@models/user'

import * as fromRoot from '@core/store'
import * as bookingActions from '@core/store/bookings/actions/booking'
import * as layoutActions from '@core/store/layouts/actions/layout'
import * as spaceActions from '@core/store/spaces/actions/space'
import * as userActions from '@core/store/users/actions/user'

@Component({
  selector: 'sn-booking-requests',
  templateUrl: './booking-requests.component.html',
  styleUrls: [ './booking-requests.component.scss' ],
})
export class BookingRequestsComponent {

  isLoading$:  Observable<boolean>
  stopper$:    Subject<boolean> = new Subject()

  bookingId:   string           = ''
  bookings:    Booking[]
  currentUser: User
  owners:      Dictionary<User>
  spaces:      Dictionary<Space>

  constructor(
    private _store:    Store<fromRoot.State>,
    private _route:    ActivatedRoute,
    private _snackBar: MatSnackBar,
    private _cdf:      ChangeDetectorRef,
  ) {
    this.isLoading$ = Observable.combineLatest(
      this._store.select(fromRoot.isBookingsLoading),
      this._store.select(fromRoot.isLoadingSpaces),
      this._store.select(fromRoot.isLoadingUsers),
    ).map(([ isLoadingBooking, isLoadingSpace, isLoadingUser ]) => isLoadingBooking || isLoadingSpace || isLoadingUser)
      .startWith(true)

    this._store.select(fromRoot.getAllBookings)
      .subscribe(bookings => {
        this.bookings = bookings.sort((a, b) => {
          let aT = a.createdOn.getTime()
          let bT = b.createdOn.getTime()
          if(aT < bT)
            return -1
          else if(aT > bT)
            return 1
          return 0
        })
      })
    this._store.select(fromRoot.getAuthUser)
      .subscribe(user => {
        if(user) {
          this.currentUser = user
          this._store.dispatch(
            new spaceActions.Filter(
              [ 'ownerUid', '==', this.currentUser.uid ],
              false,
            )
          )
        }
      })
    this._store.select(fromRoot.getSpaceEntities)
      .subscribe(spaces => {
        this.spaces  = spaces as Dictionary<Space>
        let spaceIds = Object.keys(this.spaces)
        let ownerIds = spaceIds.reduce((acc, curr) => {
          let space = this.spaces[curr]

          if(acc.indexOf(space.ownerUid) == -1)
            acc.push(space.ownerUid)

          return acc
        }, [])

        if(spaceIds.length > 0) {
          this._store.dispatch(new bookingActions.Filter(spaceIds))
          this._store.dispatch(new userActions.Select(ownerIds))
        }
      })
    this._store.select(fromRoot.getUserEntities).subscribe(owners => {
      this.owners = owners
    })
  }

  ngOnInit() {
    this._store.dispatch(new layoutActions.SetLogoGreen)
    this._route.params
      .takeUntil(this.stopper$)
      .subscribe(params => {
        this.bookingId = params.id || ''

        let action = params.action
        if(action) {
          if(!(action == 'approve' || action == 'decline'))
            return

          setTimeout(() => {
            this.modifyBooking(
              params.id,
              action == 'approve',
            )
          })
        }
      })

  }

  ngOnDestroy() {
    this.stopper$.next(true)
    this.stopper$.complete()
  }

  formatDate(date, fromFormat, toFormat = 'DD MM YYYY') {
    if(fromFormat)
      return moment(date, fromFormat).format(toFormat)
    else
      return moment(date).format(toFormat)
  }

  modifyBooking(bookingId, isApproved) {
    let action, message
    if(isApproved) {
      action  = new bookingActions.Approve(bookingId)
      message = "Booking Approved"
    }
    else {
      action  = new bookingActions.Reject(bookingId)
      message = "Booking Declined"
    }
    this._store.dispatch(action)
    this._snackBar.open(message, null, { duration: 3000 })
  }

}
