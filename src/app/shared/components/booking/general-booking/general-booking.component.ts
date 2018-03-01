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

  form: FormGroup
  isLoadingPage$: Observable<boolean>


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

    var offsets = Array.apply(null, Array(formVal.duration)).map((item, index) => index)
    bookingSpace.bookingDates = offsets.map(offset => {
      let momentDate = moment(formVal.date)

      switch(this.space.priceUnit) {
        case 'daily':
          momentDate.add(offset, 'days')
          break
        case 'weekly':
          momentDate.add(offset, 'weeks')
          break
        case 'monthly':
          momentDate.add(offset, 'months')
          break
      }

      let bookingDate      = new BookingDate()
      bookingDate.date     = momentDate.toDate()
      bookingDate.fromHour = this.space.availability.openingTime
      bookingDate.toHour   = this.space.availability.closingTime

      return bookingDate
    })

    this._store.dispatch(new cartActions.Add(bookingSpace))
  }

  // this one is a closure: a function that returns a function with the context
  // of `this.space`'s availability exceptions
  exceptions(space: Space) {
    return (d: Date | null): boolean => {
      let exceptionDates = space.availability.exceptionDays.map(date => moment(date).format('YYYY-MM-DD'))
      return exceptionDates.indexOf(moment(d).format('YYYY-MM-DD')) == -1
        && space.availability.openingDays[moment(d).format('dddd').toLowerCase()]
    }
  }

}
