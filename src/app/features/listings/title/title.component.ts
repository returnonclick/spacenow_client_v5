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
  selector: 'sn-listing-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})

export class TitleComponent {

  listing$: Observable<Space>
  listing: Space
  titleForm: FormGroup

  constructor(private _store: Store<fromRoot.State>,
              private _fb: FormBuilder,
              private listingEffects: ListingEffects,
              private router: Router
  ) {

    this.titleForm = this._fb.group({
      title: ['', Validators.required ]
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
    this.titleForm = this._fb.group({
      title: this.listing.title
    })
  }

  onSubmit() {

    this.titleForm.updateValueAndValidity()

    if(this.listing.id) {
      this._store.dispatch(new listingActions.Update( this.listing.id, this.titleForm.value ))
    }

    this.router.navigate(['listing', this.listing.id, 'price'])
  }
 
}
 