import { Component, Inject }  from '@angular/core'

import { Store }       from '@ngrx/store'

import * as layoutActions         from '@core/store/layouts/actions/layout'
import * as actions           from '@core/store/auth/actions/auth'
import * as fromRoot          from '@core/store'

@Component({
  selector: 'sn-auth-menu',
  templateUrl: './auth-menu.component.html',
  styleUrls: [ './auth-menu.component.scss' ]
})
export class AuthMenuComponent {

  constructor(
    private _store: Store<fromRoot.State>,
  ) {}

  ngOnInit() {
  }

  signOut() {
    this._store.dispatch(new layoutActions.CloseSidenav());
    this._store.dispatch(new actions.SignOut);
  }

}
