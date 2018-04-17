import { Component, Input } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MatSnackBar } from '@angular/material'
import { Store } from '@ngrx/store'

import { Space } from '@models/space'
import { User } from '@models/user'
import { Booking, BookingStatus, PoaDetails } from '@models/booking'

import * as fromRoot from '@core/store'
import * as bookingActions from '@core/store/bookings/actions/booking'

const EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

@Component({
  selector: 'sn-poa-booking',
  templateUrl: './poa-booking.component.html',
  styleUrls: [ './poa-booking.component.scss' ],
})
export class PoaBookingComponent {

  @Input() space: Space

  form: FormGroup
  user: User

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
      name:    [ '' , Validators.required ],
      email:   [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(EMAIL_REGEXP),
        ]),
      ],
      phone:   [ '' ],
      message: [ '', Validators.required ],
    })
  }

  onSubmit() {
    this.form.updateValueAndValidity()
    if(this.form.invalid)
      return

    let formVal           = this.form.value
    let poaDetails        = new PoaDetails({
      name:    formVal.name,
      email:   formVal.email,
      number:  formVal.phone,
      message: formVal.message,
    })
    let booking           = new Booking()
    booking.userId        = this.user ? this.user.uid : null
    booking.spaceId       = this.space.id
    booking.poaDetails    = poaDetails
    booking.bookingStatus = BookingStatus.ENQUIRY
    this._snackBar.open('Enquiry sent')
    this._store.dispatch(new bookingActions.Book(booking))
  }

}
