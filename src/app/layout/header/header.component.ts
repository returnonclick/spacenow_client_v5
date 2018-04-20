import { Component, ChangeDetectorRef } from '@angular/core';
import { Store, select } from '@ngrx/store'
import { Observable } from 'rxjs'

import { User }                   from '@models/user'

import * as fromRoot              from '@core/store'
import * as actions               from '@core/store/auth/actions/auth'
import * as layoutActions         from '@core/store/layouts/actions/layout'

@Component({
  selector: 'eff-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  authUser$:         Observable<User>
  isSignedIn$:       Observable<boolean>
  showSidenav$:      Observable<boolean>
  logo$:             Observable<string>

  constructor(
    private store: Store<fromRoot.State>,
    private cdRef:  ChangeDetectorRef
  ) {
    this.authUser$         = this.store.select(fromRoot.getAuthUser)
    this.isSignedIn$       = this.store.select(fromRoot.getIsSignedIn)
    this.showSidenav$      = this.store.pipe(select(fromRoot.getShowSidenav))
    this.logo$             = this.store.pipe(select(fromRoot.getLogo))
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges()
  }

  openSidenav() {
    this.store.dispatch(new layoutActions.OpenSidenav)
  }

  setSidenavLogin() {
    this.store.dispatch(new layoutActions.SetSidenavLogin)
  }

  setSidenavRegister() {
    this.store.dispatch(new layoutActions.SetSidenavRegister)
  }

  signOut() {
    this.store.dispatch(new actions.SignOut)
  }

}
