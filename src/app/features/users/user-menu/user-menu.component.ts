import { Component, Inject } from '@angular/core'

import { Store, State } from '@ngrx/store'

import * as actions from '@core/store/auth/actions/auth'
import * as fromRoot from '@core/store'

@Component({
  selector: 'sn-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: [ './user-menu.component.scss' ]
})
export class UserMenuComponent {

  constructor(private _store: Store<fromRoot.State>) {}

  signOut() {
    this._store.dispatch(new actions.SignOut);
  }

}
