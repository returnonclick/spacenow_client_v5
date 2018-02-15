import { Component, Inject } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'

import * as actions from '@core/store/listings/actions/listing'
import * as fromRoot from '@core/store'

import { ConfirmDeleteComponent, ConfirmSaveComponent } from '@shared/components'
import { Listing } from '@shared/models/listing'

import { DailyComponent } from '@features/listings/price/daily/daily.component'

@Component({
  selector: 'sn-listing-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent {

  listing: Listing
  listingForm: FormGroup
  price: any
  priceValid: boolean = false

  units = [
    { value: 'hourly', display: 'Price per hour' },
    { value: 'daily', display: 'Price per day' },
    { value: 'weekly', display: 'Price per week' },
    { value: 'monthly', display: 'Price per month' }
  ]

  constructor(
    // @Inject(MAT_DIALOG_DATA) public data: any,
    // public  dialog: MatDialog,
    // private _dialogRef: MatDialogRef<GeneralComponent>,
    private _fb: FormBuilder,
    private _store: Store<fromRoot.State>
  ) {}

  // Get price form
  getPrice(price) {
    this.price = price 
  }

  // Get price form validation
  getPriceValid(status) {
    this.priceValid = status
  }
  
  ngOnInit() {

    // this.listing = this.data.item || new Listing() -> Enable line when ready to edit
    this.listing = new Listing() // remove
    this.listing.unit = 'daily' // set when not listing.id

    this.listingForm = this._fb.group({
      title:              [this.listing.title, Validators.required],
      description:        [this.listing.description],
      rules:              [this.listing.rules, Validators.required],
      unit:               [this.listing.unit, Validators.required]
    })
  }

  onSubmit() {

    this.listingForm.updateValueAndValidity()
    this.listing = this.listingForm.value
    if (this.price) 
      this.listing.price = this.price

    if(this.listing.id)
      this._store.dispatch(new actions.Update( this.listing.id, this.listing ))
    else
      this._store.dispatch(new actions.Create( this.listing ))

  }

}

