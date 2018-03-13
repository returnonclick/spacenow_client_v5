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
  selector: 'sn-listing-term',
  templateUrl: './term.component.html',
  styleUrls: ['./term.component.scss']
})

export class TermComponent {

  listing$: Observable<Space>
  listing: Space
  isTCChecked: boolean = false
  isHTChecked: boolean = false  
  termForm: FormGroup

  constructor(private _store: Store<fromRoot.State>,
              private _fb: FormBuilder,
              private listingEffects: ListingEffects,
              private router: Router
  ) {


    this.termForm = this._fb.group({ 
      status: 'pending'
    })

    this.listing$ = this._store.select( fromRoot.selectCurrentListing )
    this.listing$.subscribe(listing => {
      if (listing) {
        this.listing = listing
      }
    })
  }

  onTCChange(event) {
    this.isTCChecked = event.checked
  }

  onHTChange(event) {
    this.isHTChecked = event.checked
  }

  onSubmit() {

    this.termForm.updateValueAndValidity()

    if(this.listing.id) {
      this._store.dispatch(new listingActions.Update( this.listing.id, this.termForm.value ))
    }

    // this.router.navigate(['listing', this.listing.id, 'price']) go to list listings
  }
  
  // TODO: Change this function for 'routerLink' in 'back-button' of price.component.html
  back() {
    this.router.navigate(['listing', this.listing.id, 'image'])
  }
}
 