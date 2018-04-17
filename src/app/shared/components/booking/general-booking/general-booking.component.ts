import { Component, Input } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MatSnackBar } from '@angular/material'
import { Store } from '@ngrx/store'

import * as moment from 'moment'

import { BookingDate, Booking, BookingStatus, PaymentStatus } from '@models/booking'
import { Space } from '@models/space'
import { User } from '@models/user'

import * as fromRoot from '@core/store'
import * as bookingActions from '@core/store/bookings/actions/booking'

@Component({
  selector: 'sn-general-booking',
  templateUrl: './general-booking.component.html',
  styleUrls: [ './general-booking.component.scss' ],
})
export class GeneralBookingComponent {

  @Input() space: Space
  @Input() category: string

  form:           FormGroup
  minDate:        Date = new Date()
  user:           User

  guests:          any = []
  durationOptions: any = []

  constructor(
    private _fb:       FormBuilder,
    private _store:    Store<fromRoot.State>,
    private _snackBar: MatSnackBar,
  ) {
    this._store.select(fromRoot.getAuthUser).subscribe(user => {
      if(user)
        this.user = user
    })
  }

  ngOnInit() {
    this.form = this._fb.group({
      date: [ new Date(), Validators.required ],
      numGuests: [ 0, Validators.compose([
        Validators.required,
        Validators.min(1),
      ]) ],
      duration: [ 0, Validators.compose([
        Validators.required,
        Validators.min(this.space.price.minimumTerm),
      ]) ],
    })

    // Set array for number of guests according to the capacity and category of a space
    for(let i = 1; i <= this.space.specifications['capacity']; i++) {
      if (this.category !== 'co-working-space' && this.category !== 'desk_only') {
        if ( i <= 10 )
          this.guests.push({display: i === 1 ? i + ' guest': i + ' guests', value: i })
        else if (i === 11)
          this.guests.push({ display: '10+ guests', value: this.space.specifications['capacity'] })
      } else {
        this.guests.push({display: i === 1 ? i + ' guest': i + ' guests', value: i })
      }
    }

    for (let i = this.space.price.minimumTerm; i <= 20; i++) {
      this.durationOptions.push({display: i === 1 ? i + ' ' + this.mapPriceUnit().replace('s', '') :  i + ' ' + this.mapPriceUnit(), value: i})
    }
  }

  mapPriceUnit() {
    if(!this.space)
      return ''

    switch(this.space.priceUnit) {
      case 'daily':   return 'days'
      case 'weekly':  return 'weeks'
      case 'monthly': return 'months'
      default:        return ''
    }
  }

  onSubmit() {
    this.form.updateValueAndValidity()
    if(this.form.invalid)
      return

    let formVal            = this.form.value
    let bookingSpace       = new Booking()
    bookingSpace.userId    = this.user ? this.user.uid : null
    bookingSpace.spaceId   = this.space.id
    bookingSpace.numGuests = formVal.numGuests

    let isAvailable = this.exceptions()
    let dateMoment  = moment(formVal.date)
    while(bookingSpace.bookingDates.length < formVal.duration) {
      let offsetDate = dateMoment.toDate()
      if(this.space.priceUnit != 'daily' || isAvailable(offsetDate)) { // explanation below (1)
        let day              = dateMoment.format('ddd').toLowerCase()
        let bookingDate      = new BookingDate()
        bookingDate.date     = offsetDate
        bookingDate.fromHour = this.space.availability.openingTime[day].startHour
        bookingDate.toHour   = this.space.availability.openingTime[day].closeHour

        bookingSpace.bookingDates.push(bookingDate)
      }

      switch(this.space.priceUnit) {
        case 'daily':
          dateMoment.add(1, 'days')
          break
        case 'weekly':
          dateMoment.add(1, 'weeks')
          break
        case 'monthly':
          dateMoment.add(1, 'months')
          break
      }
    }

    let bookingType = this.space.availability.bookingType
    if(bookingType == 'instantly') {
      bookingSpace.bookingStatus = BookingStatus.BOOKED
      bookingSpace.paymentStatus = PaymentStatus.PENDING

      let snackBar = this._snackBar.open('Space added to Booking List', 'Open')
      snackBar.onAction().subscribe(() => {
        window.open('/users/checkout')
        snackBar.dismiss()
      })
    }
    else if(bookingType == 'request') {
      bookingSpace.bookingStatus = BookingStatus.PENDING
      this._snackBar.open('Request sent to host')
    }
    else
      return
    this._store.dispatch(new bookingActions.Book(bookingSpace))
  }

  // this one is a closure: a function that returns a function with the context
  // of `this.space`'s availability exceptions
  exceptions() {
    return (d: Date | null): boolean => {
      let dayMoment       = moment(d)
      let day             = dayMoment.format('ddd').toLowerCase()
      let exceptionRanges = this.space.availability.exceptionDays.map(range => {
        return {
          from: moment(range.fromDate),
          to:   moment(range.toDate),
        }
      })

      return exceptionRanges.reduce((acc, curr) => {
          acc = acc && !moment(d).isBetween(curr.from, curr.to, null, '[]')
          return acc
        }, true) && this.space.availability.openingTime[day].isOpen
    }
  }

}

/**
 *  NOTE:
 *  (1) We want to add the BookingDate if the space's priceUnit is NOT daily (~daily) OR
 *  if it's priceUnit is daily AND the date is available (daily && available). By boolean logic:
 *
 *  >>> ~daily || (daily && available)
 *  >>> (~daily || daily) && (~daily || available)
 *  >>> TRUE && (~daily || available)
 *  >>> ~daily || available
 *
 *  Simply put, we add the BookingDate if the priceUnit is not daily or if it's available
 */
