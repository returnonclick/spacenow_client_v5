import { Component, Input } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Store } from '@ngrx/store'

import * as fromRoot from '@core/store'
import * as cartActions from '@core/store/cart/actions/cart'

@Component({
  selector: 'sn-hourly-booking',
  templateUrl: './hourly-booking.component.html',
  styleUrls: [ './hourly-booking.component.scss' ]
})
export class HourlyBookingComponent {

  @Input() spaceId: string

  form: FormGroup

  constructor(
    private _fb:    FormBuilder,
    private _store: Store<fromRoot.State>,
  ) { }

  ngOnInit() {
    this.form = this._fb.group({
      date: [ new Date(), Validators.required ],
      fromHour: [ 0, Validators.required ],
      toHour: [ 0, Validators.required ],
      numGuests: [ 0, Validators.compose([
        Validators.required,
        Validators.min(1)
      ]) ]
    })
  }

  onSubmit() {
    this.form.updateValueAndValidity()
    if(this.form.invalid)
      return
  }

}
