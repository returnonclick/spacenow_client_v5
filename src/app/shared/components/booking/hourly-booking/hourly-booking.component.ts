import { Component, Input } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Store } from '@ngrx/store'

import * as moment from 'moment'

import { OpeningDay } from '@models/availability'
import { BookingSpace, BookingDate } from '@models/booking'
import { Space } from '@models/space'

import * as fromRoot from '@core/store'
import * as cartActions from '@core/store/cart/actions/cart'

@Component({
  selector: 'sn-hourly-booking',
  templateUrl: './hourly-booking.component.html',
  styleUrls: [ './hourly-booking.component.scss' ]
})
export class HourlyBookingComponent {

  @Input() space: Space

  form:         FormGroup
  fromHourList: any[]
  toHourList:   any[]
  minDate:      Date = new Date()

  constructor(
    private _fb:    FormBuilder,
    private _store: Store<fromRoot.State>,
  ) { }

  ngOnInit() {
    this.form = this._fb.group({
      date: [ new Date(), Validators.required ],
      fromHour: [ '', Validators.required ],
      toHour: [ '', Validators.required ],
      numGuests: [ 0, Validators.compose([
        Validators.required,
        Validators.min(1)
      ]) ]
    }, {
      validator: timeValidator
    })

    this.form.get('date').valueChanges.subscribe(date => {
      let day           = moment(date).format('ddd').toLowerCase()
      let daySched      = this.space.availability.openingTime[day] as OpeningDay
      this.fromHourList = this.generateHours(daySched.startHour, daySched.closeHour - 1)
      this.toHourList   = this.generateHours(daySched.startHour + 1, daySched.closeHour)
    })
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

    this._store.dispatch(new cartActions.Add(bookingSpace))
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
      let exceptionDates = this.space.availability.exceptionDays.map(day => moment(day.date).format('YYYY-MM-DD'))
      let dayMoment      = moment(d)
      let day            = dayMoment.format('ddd').toLowerCase()

      return exceptionDates.indexOf(dayMoment.format('YYYY-MM-DD')) == -1
        && this.space.availability.openingTime[day].isOpen
    }
  }

}

function timeValidator(fg: FormGroup): { [key: string]: boolean } {
  if(fg.get('fromHour').value > fg.get('toHour').value)
    return { 'invalidTimeRange': true }

  return null
}