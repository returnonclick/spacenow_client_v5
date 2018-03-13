import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core'
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { Router, ActivatedRoute } from "@angular/router"

import * as fromRoot from '@core/store'

import { Space } from '@shared/models/space'


@Component({
  selector: 'sn-listing-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})

export class ImageComponent {

  listing$: Observable<Space>
  listing: Space
  valid: boolean

  constructor(private _store: Store<fromRoot.State>,
              private router: Router
  ) {
    this.valid = false

    this.listing$ = this._store.select( fromRoot.selectCurrentListing )
    this.listing$.subscribe(listing => {
      if (listing) {
        this.listing = listing
        if (this.listing.images.length >= 3)
          this.valid = true
      }
    })

  }

  isValid() {
    if (this.listing.images.length >= 3)
      this.valid = true
    else
      this.valid = false
  }

  onSubmit() {

    this.router.navigate(['listing', this.listing.id, 'description'])

  }

  // TODO: Change this function for 'routerLink' in 'back-button' of price.component.html
  back() {
    this.router.navigate(['listing', this.listing.id, 'terms'])
  }
  
}
 