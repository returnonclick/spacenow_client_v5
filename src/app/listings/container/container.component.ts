import { Component, OnInit, OnChanges, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from "@angular/router"
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'

import * as fromRoot from '@core/store'
import * as listingActions from '@core/store/listings/actions/listing'
import * as categoryActions from '@core/store/categories/actions/category'
import * as amenityActions from '@core/store/amenities/actions/amenity'
import * as listingSpecificationActions from '@core/store/listing-specifications/actions/listing-specification'
import * as layoutActions from '@core/store/layouts/actions/layout'

@Component({
  selector: 'sn-listing-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class ContainerComponent {

  listingId: string

  constructor(
    private _store: Store<fromRoot.State>,
    private route:  ActivatedRoute,
  ) {
    this.listingId = this.route.snapshot.params.id
  }

  ngOnInit() {
    if(typeof this.listingId !== 'undefined') {
      // Query the listing to send to listing component
      this._store.dispatch(new listingActions.QueryOne( this.listingId ))
    }

    // Query categories, amenities and specifications
    this._store.dispatch(new amenityActions.Query())
    this._store.dispatch(new categoryActions.Query())
    this._store.dispatch(new listingSpecificationActions.Query())
    this._store.dispatch(new layoutActions.SetLogoGreen)
  }

}
