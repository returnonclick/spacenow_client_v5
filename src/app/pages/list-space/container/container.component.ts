import { Component, OnInit, OnChanges } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from "@angular/router"
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'

import * as fromRoot from '@core/store'
import * as listingActions from '@core/store/listings/actions/listing'
import * as categoryActions from '@core/store/categories/category.action'
import * as amenityActions from '@core/store/amenities/actions/amenity'
import * as listingSpecificationActions from '@core/store/listing-specifications/actions/listing-specification'
import * as layoutActions from '@core/store/layouts/actions/layout'

@Component({
  selector: 'sn-listing-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})

export class ContainerComponent {

  constructor(
    private _store: Store<fromRoot.State>,
    private route:  ActivatedRoute,
  ) {
  }

  /**
   * Init Method
   * Get(id) from URL
   * 
   * The settings for the route follow the Angular documentation
   * Look the link below
   * https://angular.io/guide/router#activated-route-in-action
   */
  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id')
    this._store.dispatch(new listingActions.QueryOne( id ))
    this._store.dispatch(new amenityActions.Query())
    this._store.dispatch(new categoryActions.Query())
    this._store.dispatch(new listingSpecificationActions.Query())
    // this._store.dispatch(new layoutActions.SetLogoGreen)
  }

}
