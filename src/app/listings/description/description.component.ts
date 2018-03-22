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
  selector: 'sn-listing-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})

export class DescriptionComponent {

  listing$: Observable<Space>
  listing: Space
  descriptionForm: FormGroup
  textareaStatus: Boolean = false

  constructor(private _store: Store<fromRoot.State>,
              private _fb: FormBuilder,
              private listingEffects: ListingEffects,
              private router: Router
  ) {

    this.descriptionForm = this._fb.group({
      title: ['', Validators.required ],
      description: ['', Validators.required ],
      rules: ['']
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
    this.descriptionForm = this._fb.group({
      title:       this.listing.title,
      description: this.listing.description,
      rules:       this.listing.rules
    })
  }

  onSubmit() {

    this.descriptionForm.updateValueAndValidity()

    if(this.listing.id) {
      this._store.dispatch(new listingActions.Update( this.listing.id, this.descriptionForm.value ))
    }

    this.router.navigate(['listing', this.listing.id, 'image'])
  }

  redBox() {
    if (this.descriptionForm.controls.description.value)
      this.textareaStatus = false;
    else
    this.textareaStatus = true;
  }
 
  // TODO: Change this function for 'routerLink' in 'back-button' of price.component.html
  back() {
    this.router.navigate(['listing', this.listing.id, 'exception'])
  }

}
 