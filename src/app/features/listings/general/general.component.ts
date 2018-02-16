import { Component, Inject } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'

import * as listingActions from '@core/store/listings/actions/listing'
import * as categoryActions from '@core/store/categories/actions/category'
import * as fromRoot from '@core/store'

import { ConfirmDeleteComponent, ConfirmSaveComponent } from '@shared/components'
import { Listing } from '@shared/models/listing'
import { Category } from '@shared/models/category'

@Component({
  selector: 'sn-listing-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent {

  listing: Listing
  listingForm: FormGroup
  categories$: Observable<Category[]>
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
  ) {

    this.categories$ = this._store.select(fromRoot.getAllCategories)
    
  }

  // Get price form
  getPrice(price) {
    this.price = price 
  }

  // Get price form validation
  getPriceValid(status) {
    this.priceValid = status
  }
  
  ngOnInit() {
    console.log()
    // this.listing = this.data.item || new Listing() -> Enable line when ready to edit
    this.listing = new Listing() // remove
    this.listing.unit = 'daily' // set when not listing.id

    // Get the categories
    this._store.dispatch(new categoryActions.Query)

    this.listingForm = this._fb.group({
      title:              [this.listing.title, Validators.required],
      description:        [this.listing.description],
      rules:              [this.listing.rules, Validators.required],
      unit:               [this.listing.unit, Validators.required],

      categoryId:               [this.listing.categoryId, Validators.required],
      // amenityIds:               [this.listing.amenityIds, Validators.required],
      // capacity:               [this.listing.capacity, Validators.required],
      // size:               [this.listing.size, Validators.required],

      // extendedAddress:               [this.listing.address.extendedAddress, Validators.required],
      // streetAddress:               [this.listing.address.streetAddress, Validators.required],
      // locality:               [this.listing.address.locality, Validators.required],
      // region:               [this.listing.address.region, Validators.required],
      // postalCode:               [this.listing.address.postalCode, Validators.required],
      // countryCodeAlpha2:               [this.listing.address.countryCodeAlpha2, Validators.required],
      // countryName:               [this.listing.address.countryName, Validators.required],

    })
  }

  onSubmit() {

    this.listingForm.updateValueAndValidity()
    this.listing = this.listingForm.value
    if (this.price) 
      this.listing.price = this.price

    if(this.listing.id)
      this._store.dispatch(new listingActions.Update( this.listing.id, this.listing ))
    else
      this._store.dispatch(new listingActions.Create( this.listing ))

  }

}

