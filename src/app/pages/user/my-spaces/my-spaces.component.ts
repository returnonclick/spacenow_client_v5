import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'

import { Space } from '@models/space'
import { ListingShortDetail } from '@models/listing-short-detail'
import { User } from '@models/user'

import * as fromRoot from '@core/store'
import * as spaceActions from '@core/store/spaces/actions/space'

@Component({
  selector: 'sn-my-spaces',
  templateUrl: './my-spaces.component.html',
  styleUrls: [ './my-spaces.component.scss'],
})
export class MySpacesComponent {

  spaces$: Observable<(Space | ListingShortDetail)[]>
  user$:   Observable<User>

  constructor(
    private _store: Store<fromRoot.State>
  ) {
    this.spaces$ = this._store.select(fromRoot.getAllSpaces)
    this.user$   = this._store.select(fromRoot.getAuthUser)

    this.user$.subscribe(user => {
      if(user) {
        this._store.dispatch(
          new spaceActions.Filter(['ownerUid', '==', user.uid], true)
        )
      }
    })
  }

}
