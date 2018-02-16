import { Component, Inject, Input, Output, OnInit, EventEmitter } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'

import * as actions from '@core/store/listings/actions/listing'
import * as fromRoot from '@core/store'

import { ConfirmDeleteComponent, ConfirmSaveComponent } from '@shared/components'
import { Daily } from '@shared/models/space'

@Component({
  selector: 'sn-listing-address',
  templateUrl: './listing-address.component.html',
  styleUrls: ['./listing-address.component.scss']
})
export class ListingAddressComponent {

  //@Output() price = new EventEmitter<Daily>();
  //@Output() priceValid = new EventEmitter<boolean>();

  listingAddressForm: FormGroup

  constructor(
    private _fb: FormBuilder
  ) {}

  sendPrice() {
    console.log(this.listingAddressForm)
    // this.priceForm.updateValueAndValidity()
    // this.daily = this.priceForm.value
    // // Send price values
    // this.price.emit(
    //    this.daily
    // )
    // // Send form status for validation
    // this.priceValid.emit(
    //   this.priceForm.valid
    // )
  }

  ngOnInit() {
    // Initialize
    // this.daily.incentives = false

    this.listingAddressForm = this._fb.group({
      unit:              [],
    })

  }

}
