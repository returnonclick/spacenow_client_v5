import { Component, Input, ViewEncapsulation } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MatSnackBar } from '@angular/material'
import { Store } from '@ngrx/store'

import * as moment from 'moment'

import { BookingDate, Booking, BookingStatus, PaymentStatus } from '@models/booking'
import { Daily, Monthly, Space, Weekly } from '@models/space'
import { User } from '@models/user'

import * as fromRoot from '@core/store'
import * as bookingActions from '@core/store/bookings/actions/booking'

@Component({
  selector: 'sn-general-booking',
  templateUrl: './general-booking.component.html',
  styleUrls: [ './general-booking.component.scss' ],
  encapsulation: ViewEncapsulation.None,
})
export class GeneralBookingComponent {

  @Input() space:     Space
  @Input() category:  string

  form:               FormGroup
  formOptions:        any                = {}
  minDate:            Date               = new Date()
  user:               User
  selectedIncentive:  string             = 'none'

  private _transform: (number) => string = (i: number) => `${i | 0} ${(i % 1) * 60}`

  constructor(
    private _fb:       FormBuilder,
    private _store:    Store<fromRoot.State>,
    private _snackBar: MatSnackBar,
  ) {
    this._store.select(fromRoot.getAuthUser).subscribe(user => {
      if(user)
        this.user = user
    })
    this.formOptions.incentiveTypes = [
      { display: 'No incentive', value: 'none' },
    ]
  }

  ngOnInit() {
    this.form = this._fb.group({
      date:          [ new Date(), Validators.required ],
      incentiveType: [ 'none', this.space.price.incentives ? Validators.required : [] ],
      incentive:     [ '' ],
      numGuests:     [
        0,
        Validators.compose([
          Validators.required,
          Validators.min(1),
        ]),
      ],
      duration:      [
        0,
        Validators.compose([
          Validators.required,
          Validators.min(this.space.price.minimumTerm),
        ]),
      ],
    })

    switch(this.space.priceUnit) {
      case 'daily':
        this._dailyIncentives()
        break
      case 'weekly':
        this._weeklyIncentives()
        break
      case 'monthly':
        this._monthlyIncentives()
        break
      default:
        break
    }

    // Set array for number of guests according to the capacity and category of a space
    let cap                 = this.space.specifications['capacity']
    this.formOptions.guests = Array(cap)
      .fill(0)
      .map((el, i) => {
        return {
          display: `${i + 1} guest${i == 0 ? '' : 's'}`,
          value:   i + 1,
        }
      })
    if(cap > 10 && !(this.category == 'co-working-space' || this.category == 'desk_only')) {
      this.formOptions.guests     = this.formOptions.guests.slice(0, 11)
      this.formOptions.guests[10] = {
        display: '10+ guests',
        value:   cap,
      }
    }

    const MAX_DURATION        = 20
    let minimumTerm           = this.space.price.minimumTerm
    this.formOptions.duration = Array(MAX_DURATION - minimumTerm + 1)
      .fill(0)
      .map((el, i) => {
        let duration  = i + minimumTerm
        let priceUnit = this.mapPriceUnit()
        return {
          display: `${duration} ${duration == 1 ? priceUnit.replace('s', '') : priceUnit}`,
          value:   duration,
        }
      })
  }

  formatTime(time) {
    return moment(time, 'HH').format('h a')
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
        let day         = dateMoment.format('ddd').toLowerCase()
        let bookingDate = new BookingDate({
          date:           offsetDate,
          fromHour:       this.space.availability.openingTime[day].startHour,
          toHour:         this.space.availability.openingTime[day].closeHour,
          incentivePrice: formVal.incentive,
        })
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
        window.open('/users/my-bookings')
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

  private _dailyIncentives() {
    this.formOptions.incentiveTypes = [
      ...this.formOptions.incentiveTypes,
      { display: '1-week Pass', value: 7 },
    ]

    let price = this.space.price as Daily
    this.form.get('incentiveType').valueChanges.subscribe(val => {
      this.selectedIncentive = val
      let duration, incentive
      switch(val) {
        case 7:
          duration  = val
          incentive = price.week
          break
        case 'none':
        default:
          duration  = null
          incentive = null
      }
      this.form.get('duration').setValue(duration)
      this.form.get('incentive').setValue(incentive)
    })
  }

  private _weeklyIncentives() {
    this.formOptions.incentiveTypes = [
      ...this.formOptions.incentiveTypes,
      { display: '1-month Pass', value: 4 },
    ]

    let price = this.space.price as Weekly
    this.form.get('incentiveType').valueChanges.subscribe(val => {
      this.selectedIncentive = val
      let duration, incentive
      switch(val) {
        case 4:
          duration  = val
          incentive = price.month
          break
        case 'none':
        default:
          duration  = null
          incentive = null
      }
      this.form.get('duration').setValue(duration)
      this.form.get('incentive').setValue(incentive)
    })
  }

  private _monthlyIncentives() {
    this.formOptions.incentiveTypes = [
      ...this.formOptions.incentiveTypes,
      { display: '6-month Pass', value: 6 },
      { display: '1-year Pass', value: 12 },
    ]

    let price = this.space.price as Monthly
    this.form.get('incentiveType').valueChanges.subscribe(val => {
      this.selectedIncentive = val
      let duration, incentive
      switch(val) {
        case 6:
          duration  = val
          incentive = price.sixMonths
          break
        case 12:
          duration  = val
          incentive = price.year
          break
        case 'none':
        default:
          duration  = null
          incentive = null
      }
      this.form.get('duration').setValue(duration)
      this.form.get('incentive').setValue(incentive)
    })
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
