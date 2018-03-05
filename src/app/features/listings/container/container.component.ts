import { Component, OnInit, OnChanges } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router"
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'

import * as fromRoot from '@core/store'
import * as listingActions from '@core/store/listings/actions/listing'
import { ListingEffects } from '@core/store/listings/effects/listing'

import * as categoryActions from '@core/store/categories/actions/category'
import * as amenityActions from '@core/store/amenities/actions/amenity'
import * as listingSpecificationActions from '@core/store/listing-specifications/actions/listing-specification'

import { Space } from '@shared/models/space'
import { Category } from '@shared/models/category'
import { Amenity } from '@shared/models/amenity'
import { ListingSpecification } from '@shared/models/listing-specification'
import { OpeningTime } from '@models/opening-time'

@Component({
  selector: 'sn-listing-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent {

  listing$: Observable<Space>
  categories$: Observable<Category[]>
  amenities$: Observable<Amenity[]>
  specifications$: Observable<ListingSpecification[]>

  isLoading$: Observable<boolean>;
  isLoadingListing$: Observable<boolean>;

  listingId: string
  listing: Space

  constructor(private _store: Store<fromRoot.State>,
              private route: ActivatedRoute
  ) {

    this.isLoading$ = this._store.select(fromRoot.getIsCategoryLoading);
    this.isLoadingListing$ = this._store.select(fromRoot.getIsListingLoading);

    // Get the list of categories
    this._store.dispatch(new categoryActions.Query)

    // Get the list of amenities
    this._store.dispatch(new amenityActions.Query)

    // Get the list of specifications
    this._store.dispatch(new listingSpecificationActions.Query)

    this.listing$ = this._store.select( fromRoot.selectCurrentListing )
    this.categories$ = this._store.select( fromRoot.getAllCategories )
    this.amenities$ = this._store.select( fromRoot.getAllAmenities )
    this.specifications$ = this._store.select( fromRoot.getAllListingSpecifications )

    // Get listing id from route params
    this.listingId = this.route.snapshot.params.id
    console.log(this.listingId)

  }

  ngOnInit() {

    if (typeof this.listingId === 'undefined') {

      this.listing = new Space

      // Initialize listing
      this.listing.availability.openingTime ? this.listing.availability.openingTime : this.listing.availability.openingTime = new OpeningTime()
      // this.listing.availability.closingTime ? this.listing.availability.closingTime : this.listing.availability.closingTime = 17
      this.listing.priceUnit ? this.listing.priceUnit : this.listing.priceUnit = 'daily'
      this.listing.availability.isOpen247 ? this.listing.availability.isOpen247 : this.listing.availability.isOpen247 = false

      // Generate random alphanumeric listing ID 
      var m = 21, s = '', r = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      for (var i=0; i < m; i++) { s += r.charAt(Math.floor(Math.random()*r.length)); }
      this.listingId = this.listing.id = s

      // Create new listing
      this._store.dispatch(new listingActions.Create( this.listing ))

    }
  
    // Query the listing to send to listing component
    this._store.dispatch(new listingActions.QueryOne( this.listingId ))

  }

}
