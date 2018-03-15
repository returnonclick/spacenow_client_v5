import { Component, Input, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'

import * as moment from 'moment'

import { BookingSpace, BookingDate } from '@models/booking'
import { Space } from '@models/space'

import * as fromRoot from '@core/store'
import * as cartActions from '@core/store/cart/actions/cart'

@Component({
  selector: 'sn-general-booking',
  templateUrl: './general-booking.component.html',
  styleUrls: [ './general-booking.component.scss' ]
})
export class GeneralBookingComponent implements OnInit {

  @Input() space: Space

  form:    FormGroup
  minDate: Date = new Date()

  constructor(
    private _fb:    FormBuilder,
    private _store: Store<fromRoot.State>,
  ) { }

  ngOnInit() {
    this.form = this._fb.group({
      date: [ new Date(), Validators.required ],
      numGuests: [ 0, Validators.compose([
        Validators.required,
        Validators.min(1)
      ]) ],
      duration: [ 1, Validators.compose([
        Validators.required,
        Validators.min(1)
      ]) ],
    })
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
    let bookingSpace       = new BookingSpace()
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

    this._store.dispatch(new cartActions.Add(bookingSpace))
  }

  // this one is a closure: a function that returns a function with the context
  // of `this.space`'s availability exceptions
  exceptions() {
    return (d: Date | null): boolean => {
      let exceptionDates = this.space.availability.exceptionDays.map(day => moment(day.fromDate).format('YYYY-MM-DD'))
      let dayMoment      = moment(d)
      let day            = dayMoment.format('ddd').toLowerCase()

      return exceptionDates.indexOf(dayMoment.format('YYYY-MM-DD')) == -1
        && this.space.availability.openingTime[day].isOpen
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
