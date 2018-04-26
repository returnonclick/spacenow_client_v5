import { Component, Input, ViewEncapsulation } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MatSnackBar } from '@angular/material'
import { Store } from '@ngrx/store'

import * as moment from 'moment'

import { OpeningDay } from '@models/availability'
import { BookingDate, Booking, BookingStatus, PaymentStatus } from '@models/booking'
import { Hourly, Space } from '@models/space'
import { User } from '@models/user'

import * as fromRoot from '@core/store'
import * as bookingActions from '@core/store/bookings/actions/booking'

@Component({
  selector: 'sn-hourly-booking',
  templateUrl: './hourly-booking.component.html',
  styleUrls: [ './hourly-booking.component.scss' ],
  encapsulation: ViewEncapsulation.None,
})
export class HourlyBookingComponent {

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
      { display: 'Half-day Pass', value: 'halfday' },
      { display: 'Full-day Pass', value: 'fullday' },
    ]
  }

  ngOnInit() {
    this.form = this._fb.group({
      date:          [ new Date(), Validators.required ],
      fromHour:      [ '', Validators.required ],
      toHour:        [ '', Validators.required ],
      incentiveType: [ 'none', this.space.price.incentives ? Validators.required : [] ],
      incentive:     [ '' ] ,
      numGuests:     [
        0,
        Validators.compose([
          Validators.required,
          Validators.min(1),
        ]),
      ],
    }, {
      validator: [
        timeValidator,
        minTimeValidator(this.space.price.minimumTerm),
      ],
    })

    let date = new Date()
    this.form.get('date').valueChanges.subscribe(selectedDate => {
      date                      = selectedDate
      let day                   = moment(date).format('ddd').toLowerCase()
      let daySched              = this.space.availability.openingTime[day] as OpeningDay
      this.formOptions.fromHour = this.generateHours(daySched.startHour, daySched.closeHour - 1)
      this.formOptions.toHour   = this.generateHours(daySched.startHour + 1, daySched.closeHour)
    })

    let fromHour = this.form.get('fromHour')
    let toHour   = this.form.get('toHour')
    this.form.get('incentiveType').valueChanges.subscribe(type => {
      this.selectedIncentive = type
      let price              = this.space.price as Hourly
      let day                = moment(date).format('ddd').toLowerCase()
      let daySched           = this.space.availability.openingTime[day] as OpeningDay
      switch(type) {
        case 'halfday':
          let mid = (daySched.startHour + daySched.closeHour) / 2.0
          this.formOptions.incentiveScheds = [
            {
              display: 'Half Day Pass (AM)',
              value: new BookingDate({
                date:           date,
                fromHour:       daySched.startHour,
                toHour:         mid,
                incentivePrice: price.halfDay,
              }),
            },
            {
              display: 'Half Day Pass (PM)',
              value: new BookingDate({
                date:           date,
                fromHour:       mid,
                toHour:         daySched.closeHour,
                incentivePrice: price.halfDay,
              }),
            },
          ]
          break
        case 'fullday':
          this.formOptions.incentiveScheds = [
            {
              display: 'Full Day Pass ()',
              value: new BookingDate({
                date:           date,
                fromHour:       daySched.startHour,
                toHour:         daySched.closeHour,
                incentivePrice: price.day,
              }),
            },
          ]
          break
        case 'none':
        default:
          this.formOptions.incentiveScheds = []
          break
      }
      fromHour.setValue(null)
      toHour.setValue(null)
    })

    this.form.get('incentive').valueChanges.subscribe(incentive => {
      fromHour.setValue(incentive.fromHour)
      toHour.setValue(incentive.toHour)
    })

     // Set array for number of guests according to the capacity and category of a space
    let cap = this.space.specifications['capacity']
    this.formOptions.guests = Array(cap)
      .fill(0)
      .map((el, i) => {
        return {
          display: `${i + 1} guest${i == 0 ? '' : 's'}`,
          value: i + 1,
        }
      })
    if(cap > 10 && !(this.category == 'co-working-space' || this.category == 'desk_only')) {
      this.formOptions.guests = this.formOptions.guests.slice(0, 11)
      this.formOptions.guests[10] = {
        display: '10+ guests',
        value:   cap,
      }
    }
  }

  onSubmit() {
    this.form.updateValueAndValidity()
    if(this.form.invalid)
      return

    let formVal               = this.form.value
    let bookingSpace          = new Booking()
    bookingSpace.userId       = this.user ? this.user.uid : null
    bookingSpace.spaceId      = this.space.id
    bookingSpace.numGuests    = formVal.numGuests
    bookingSpace.bookingDates = [
      new BookingDate({
        date:           formVal.date,
        fromHour:       formVal.fromHour,
        toHour:         formVal.toHour,
        incentivePrice: formVal.incentive ? formVal.incentive.incentivePrice : 0,
      })
    ]

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

  formatTime(time) {
    return moment(this._transform(time), 'HH mm').format('h:mm a')
  }

  generateHours(start, end) {
    return Array.apply(null, Array(end - start + 1)).map((i, index) => index + start)
  }

  transformHour(hour) {
    return moment().hour(hour).format('h a')
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

const timeValidator = (fg: FormGroup): { [key: string]: boolean } => {
  if(fg.get('fromHour').value > fg.get('toHour').value)
    return { 'invalidTimeRange': true }

  return null
}

const minTimeValidator = (minTime: number) => {
  return (fg: FormGroup): { [key: string]: boolean } => {
    let fromHour  = fg.get('fromHour').value
    let toHour    = fg.get('toHour').value
    let incentive = fg.get('incentive').value

    if(toHour - fromHour < minTime || incentive)
      return { 'lessThanMinTime': true }

    return null
  }
}
