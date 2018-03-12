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
        country:                      [''],
        postal_code:                  [''],
        lat:                          [''],
        lng:                          ['']
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
        route:                        [this.listing.address.route, Validators.required],
        locality:                     [this.listing.address.locality, Validators.required],
        administrative_area_level_1:  [this.listing.address.administrative_area_level_1, Validators.required],
        country:                      [this.listing.address.country, Validators.required],
        postal_code:                  [this.listing.address.postal_code, Validators.required],
        lat:                          [this.listing.address.lat],
        lng:                          [this.listing.address.lng]
      })
    })
  }

  getAddressChange(event) {
    const address = this.addressForm.get('address')
    address.setValue(event)
  }

  onSubmit() {

    this.addressForm.updateValueAndValidity()

    if(this.listing.id) {
      this._store.dispatch(new listingActions.Update( this.listing.id, this.addressForm.value ))
    }

    this.router.navigate(['listing', this.listing.id, 'description'])
  }

  // TODO: Change this function for 'routerLink' in 'back-button' of price.component.html
  back() {
    this.router.navigate(['listing', this.listing.id, 'specification'])
  }
 
}
 