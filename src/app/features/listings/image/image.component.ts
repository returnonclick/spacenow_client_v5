import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core'
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { Router, ActivatedRoute } from "@angular/router"

import * as fromRoot from '@core/store'
import * as listingActions from '@core/store/listings/actions/listing'

import { Space } from '@shared/models/space'
import { ImageData } from '@shared/models/image-data'


@Component({
  selector: 'sn-listing-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})

export class ImageComponent {

  listing$: Observable<Space>
  listing: Space
  valid: boolean
  storagePath: string = `/images/listings/{$listingID}/{$imageID}/{IMAGE_SIZE.JPG}`
  images: Array<ImageData> = new Array()

  constructor(private _store: Store<fromRoot.State>,
              private router: Router
  ) {
    this.valid = false

    this.listing$ = this._store.select( fromRoot.selectCurrentListing )
    this.listing$.subscribe(listing => {
      if (listing) {
        this.listing = listing
        this.storagePath = `/images/listings/${this.listing.id}`

        if (this.listing.images.length > 0)
          this.images = this.listing.images

        if (this.images.length >= 3)
          this.valid = true
      }
    })

  }

  getImage(event) {
    this.images.push(event.path)
    if (this.images.length >= 3)
      this.valid = true
    else
      this.valid = false
  }

  remove(image) {
    this.images = this.images.filter(res => res !== image)
    if (this.images.length >= 3)
      this.valid = true
    else
      this.valid = false
  }

  onSubmit() {

    if(this.listing.id) {
      this._store.dispatch(new listingActions.Update( this.listing.id, { images: this.images } ))
    }

    this.router.navigate(['app/listings', this.listing.id, 'terms'])

  }

  // TODO: Change this function for 'routerLink' in 'back-button' of price.component.html
  back() {
    this.router.navigate(['app/listings', this.listing.id, 'description'])
  }
  
}
 