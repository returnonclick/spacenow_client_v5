import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core'
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { Router, ActivatedRoute } from "@angular/router"

import * as fromRoot from '@core/store'
import * as listingActions from '@core/store/listings/actions/listing'
import { ListingEffects } from '@core/store/listings/effects/listing'

import { Space } from '@shared/models/space'


@Component({
  selector: 'sn-listing-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})

export class AddressComponent {

  listing$: Observable<Space>
  listing: Space
  addressForm: FormGroup

  closeHelp: boolean = false

  constructor(private _store: Store<fromRoot.State>,
              private _fb: FormBuilder,
              private listingEffects: ListingEffects,
              private router: Router
  ) {

    this.addressForm = this._fb.group({
      address: this._fb.group({
        unit_number:                  [''],
        street_number:                [''],
        route:                        [''],
        locality:                     [''],
        administrative_area_level_1:  [''],
        country:                      ['', Validators.required],
        postal_code:                  [''],
        latitude:                     [''],
        longitude:                    [''],
        full_name:                    ['']
      })
    })

    this.listing$ = this._store.select( fromRoot.selectCurrentListing )
    this.listing$.subscribe(listing => {
      if (listing) {
        this.listing = listing
        this.createForm()
      }
    })

  }

  createForm() {
    this.addressForm = this._fb.group({
      address: this._fb.group({
        unit_number:                  [this.listing.address.unit_number],
        street_number:                [this.listing.address.street_number],
        route:                        [this.listing.address.route],
        locality:                     [this.listing.address.locality],
        administrative_area_level_1:  [this.listing.address.administrative_area_level_1],
        country:                      [this.listing.address.country],
        postal_code:                  [this.listing.address.postal_code],
        latitude:                     [this.listing.address.latitude],
        longitude:                    [this.listing.address.longitude],
        full_name:                    [this.listing.address.full_name]
      })
    })
  }

  getAddressChange(event) {
    const address = this.addressForm.get('address')
    address.setValue(event)
    address.updateValueAndValidity()
  }

  onSubmit() {

    this.addressForm.updateValueAndValidity()

    if(this.listing.id) {
      this._store.dispatch(new listingActions.Update( this.listing.id, this.addressForm.value ))
    }

    this.router.navigate(['app/listings', this.listing.id, 'amenity'])
  }

  // TODO: Change this function for 'routerLink' in 'back-button' of price.component.html
  back() {
    this.router.navigate(['app/listings', this.listing.id, 'category'])
  }
 
}
 