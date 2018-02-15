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

  categories = [
    { value: 'Office', display: 'Office' },
    { value: 'Desk only', display: 'Desk only' },
    { value: 'Event', display: 'Event' },
    { value: 'Studio', display: 'Studio' },
    { value: 'Popup retail', display: 'Popup retail' },
    { value: 'Hospitality', display: 'Hospitality' },
    { value: 'Fitness', display: 'Fitness' },
    { value: 'Medical & consulting', display: 'Medical & consulting' },
    { value: 'Car park', display: 'Car park' },
    { value: 'Warehouse', display: 'Warehouse' },
    { value: 'Market & stalls', display: 'Market & stalls' },
    { value: 'Home office', display: 'Home office' },
    { value: 'Wedding venues', display: 'Wedding venues' },
    { value: 'Coworking', display: 'Coworking' },
    { value: 'Meeting room', display: 'Meeting room' },
    { value: 'Function centre', display: 'Function centre' },
    { value: 'Retail', display: 'Retail' },
    { value: 'Kitchen', display: 'Kitchen' },
    { value: 'Yoga & pilates', display: 'Yoga & pilates' },
    { value: 'Music studio', display: 'Music studio' },
    { value: 'Remedial & sports injury', display: 'Remedial & sports injury' },
    { value: 'Storage', display: 'Storage' },
    { value: 'Shared office', display: 'Shared office' },
    { value: 'Conference room', display: 'Conference room' },
    { value: 'Unique workspace', display: 'Unique workspace' },
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
      unit:               [this.listing.unit, Validators.required],

      categoryId:               [this.listing.categoryId, Validators.required],
      amenityIds:               [this.listing.amenityIds, Validators.required],
      capacity:               [this.listing.capacity, Validators.required],
      size:               [this.listing.size, Validators.required],

      extendedAddress:               [this.listing.address.extendedAddress, Validators.required],
      streetAddress:               [this.listing.address.streetAddress, Validators.required],
      locality:               [this.listing.address.locality, Validators.required],
      region:               [this.listing.address.region, Validators.required],
      postalCode:               [this.listing.address.postalCode, Validators.required],
      countryCodeAlpha2:               [this.listing.address.countryCodeAlpha2, Validators.required],
      countryName:               [this.listing.address.countryName, Validators.required],

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

