import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router"
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'

import * as fromRoot from '@core/store'
import * as listingActions from '@core/store/listings/actions/listing'
import { ListingEffects } from '@core/store/listings/effects/listing'

import { Space } from '@shared/models/space'


@Component({
  selector: 'sn-listing-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent implements OnChanges  {

  listing$: Observable<Space>

  constructor(private _store: Store<fromRoot.State>,
              private route: ActivatedRoute
  ) {
    this.listing$ = this._store.select( fromRoot.selectCurrentListing )
  }

  ngOnChanges(changes: SimpleChanges) {

    if (changes['categories']) {
      // console.log(this.categories)
    }

  }

}
