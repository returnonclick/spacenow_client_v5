import { Component, Input } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MatSnackBar } from '@angular/material'
import { Store } from '@ngrx/store'

import * as moment from 'moment'

import { OpeningDay } from '@models/availability'
import { BookingRequest, BookingSpace, BookingDate } from '@models/booking'
import { Space } from '@models/space'
import { User } from '@models/user'

import * as fromRoot from '@core/store'
import * as cartActions from '@core/store/cart/actions/cart'

@Component({
  selector: 'sn-hourly-booking',
  templateUrl: './hourly-booking.component.html',
  styleUrls: [ './hourly-booking.component.scss' ]
})
export class HourlyBookingComponent {

  @Input() space: Space
  @Input() category: string

  form:           FormGroup
  fromHourList:   any[] = []
  toHourList:     any[] = []
  minDate:        Date = new Date()
  user:           User

  guests:         any = []

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
      date:      [ new Date(), Validators.required ],
      fromHour:  [ '', Validators.required ],
      toHour:    [ '', Validators.required ],
      numGuests: [ 0, Validators.compose([
        Validators.required,
        Validators.min(1)
      ]) ]
    }, {
      validator: [
        timeValidator,
        minTimeValidator(this.space.price.minimumTerm),
      ]
    })

    this.form.get('date').valueChanges.subscribe(date => {
      let day           = moment(date).format('ddd').toLowerCase()
      let daySched      = this.space.availability.openingTime[day] as OpeningDay
      this.fromHourList = this.generateHours(daySched.startHour, daySched.closeHour - 1)
      this.toHourList   = this.generateHours(daySched.startHour + 1, daySched.closeHour)
    })

     // Set array for number of guests according to the capacity and category of a space
     for(let i = 1; i <= this.space.specifications['capacity']; i++) {
      if (this.category !== 'co-working-space' && this.category !== 'desk_only') {
        if ( i <= 10 )
          this.guests.push({display: i === 1 ? i + ' Guest': i + ' Guests', value: i })
        else if (i === 11)
          this.guests.push({ display: '10+ Guests', value: this.space.specifications['capacity'] })
      } else {
        this.guests.push({display: i === 1 ? i + ' Guest': i + ' Guests', value: i })
      }
    }
  }

  onSubmit() {
    this.form.updateValueAndValidity()
    if(this.form.invalid)
      return

    let formVal               = this.form.value
    let bookingSpace          = new BookingSpace()
    bookingSpace.numGuests    = formVal.numGuests
    bookingSpace.spaceId      = this.space.id
    bookingSpace.bookingDates = [
      new BookingDate({
        date:     formVal.date,
        fromHour: formVal.fromHour,
        toHour:   formVal.toHour,
      })
    ]

    let bookingType = this.space.availability.bookingType
    if(bookingType == 'instantly') {
      this._store.dispatch(new cartActions.Add(bookingSpace))
      let snackBar = this._snackBar.open('Space added to Booking List', 'Open')
      snackBar.onAction().subscribe(() => {
        window.open('/users/checkout')
        snackBar.dismiss()
      })
    }
    else if(bookingType == 'request') {
      let request = new BookingRequest({
        createdOn:    new Date(),
        userId:       this.user.uid,
        spaceBooking: bookingSpace,
      })
      this._store.dispatch(new cartActions.Request(request))
      let snackBar = this._snackBar.open('Request sent to host')
    }
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
      let exceptionRanges = this.space.availability.exceptionDays.map(range => {
        return {
          from: moment(range.fromDate),
          to:   moment(range.toDate),
        }
      })
      // let exceptionDates = this.space.availability.exceptionDays.map(day => moment(day.fromDate).format('YYYY-MM-DD'))
      let dayMoment      = moment(d)
      let day            = dayMoment.format('ddd').toLowerCase()

      return exceptionRanges.reduce((acc, curr) => {
          acc = acc && !moment(d).isBetween(curr.from, curr.to, null, '[]')
          return acc
        }, true)// exceptionDates.indexOf(dayMoment.format('YYYY-MM-DD')) == -1
        && this.space.availability.openingTime[day].isOpen
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
    let fromHour = fg.get('fromHour').value
    let toHour = fg.get('toHour').value

    if(toHour - fromHour < minTime)
      return { 'lessThanMinTime': true }

    return null
  }
}
