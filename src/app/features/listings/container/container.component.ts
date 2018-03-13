import { Component, OnInit, OnChanges } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from "@angular/router"
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'

import * as fromRoot from '@core/store'
import * as listingActions from '@core/store/listings/actions/listing'
import * as categoryActions from '@core/store/categories/actions/category'
import * as amenityActions from '@core/store/amenities/actions/amenity'
import * as listingSpecificationActions from '@core/store/listing-specifications/actions/listing-specification'

import { Space } from '@models/space'
import { User } from '@models/user'

@Component({
  selector: 'sn-listing-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})

export class ContainerComponent {

  listing$: Observable<Space>
  listingId: string
  listing: Space 
  user$: Observable<User>

  constructor(private _store: Store<fromRoot.State>,
              private route: ActivatedRoute
  ) {

    this.listingId = this.route.snapshot.params.id

    // this._store.dispatch(new authActions.GetUser())
    this.user$ = this._store.select( fromRoot.getAuthUserState )
    this.user$.subscribe(user => {
      // TODO: Change this when login module merged
      // if (user)
      //   this.create()
    })

  }

  ngOnInit() {

    if (typeof this.listingId === 'undefined') {

      this.listing = new Space()

      // Generate random alphanumeric listing ID 
      var m = 21, s = '', r = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      for (var i=0; i < m; i++) { s += r.charAt(Math.floor(Math.random()*r.length)); }
      this.listingId = this.listing.id = s

      // Create new listing
      this._store.dispatch(new listingActions.Create( this.listing ))

    }
  
    // Query the listing to send to listing component
    this._store.dispatch(new listingActions.QueryOne( this.listingId ))

    // Query categories, amenities and specifications
    this._store.dispatch(new amenityActions.Query())
    this._store.dispatch(new categoryActions.Query())
    this._store.dispatch(new listingSpecificationActions.Query())

  }

}
