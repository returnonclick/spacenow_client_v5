import { Component } from '@angular/core'
import { Store } from '@ngrx/store'

import { User } from '@models/user'

import * as fromRoot from '@core/store'
import * as layoutActions from '@core/store/layouts/actions/layout'
import * as spaceActions from '@core/store/spaces/actions/space'

@Component({
  selector: 'sn-booking-requests',
  templateUrl: './booking-requests.component.html',
  styleUrls: [ './booking-requests.component.scss' ],
})
export class BookingRequestsComponent {

  user: User

  constructor(
    private _store: Store<fromRoot.State>,
  ) {
    this._store.select(fromRoot.getAuthUser).subscribe(user => {
      if(user)
        this.user = user
    })
  }

  ngOnInit() {
    this._store.dispatch(new layoutActions.SetLogoGreen)
  }

}
