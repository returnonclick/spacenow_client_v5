import { Component, OnInit }      from '@angular/core'
import { Store, select }          from '@ngrx/store'
import { AngularFireAuth }        from 'angularfire2/auth'
import { Observable }             from 'rxjs'

import { User }                   from '@shared/models/user'

import * as actions               from '@core/store/auth/actions/auth'
import * as layoutActions         from '@core/store/layouts/actions/layout'
import * as fromRoot              from '@core/store'

@Component({
  selector: 'gen-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  authUser$: Observable<User>
  isSignedIn$: Observable<boolean>
  showSidenav$: Observable<boolean>

  constructor(
    private _store: Store<fromRoot.State>,
    private afAuth: AngularFireAuth
  ) {
    this.authUser$ = this._store.select(fromRoot.getSelectedAuth)
    this.isSignedIn$ = this._store.select(fromRoot.getIsSignedInState)
    this.showSidenav$ = this._store.pipe(select(fromRoot.getShowSidenav));
  }

  ngOnInit() {
    this.afAuth.authState.subscribe((userData) => userData ? this._store.dispatch(new actions.GetUser(userData)) : null)
  }

  closeSidenav() {
    this._store.dispatch(new layoutActions.CloseSidenav());
  }

  openSidenav() {
    this._store.dispatch(new layoutActions.OpenSidenav());
  }
}
