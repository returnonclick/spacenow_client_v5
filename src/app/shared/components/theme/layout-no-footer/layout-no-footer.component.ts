import { Component, 
  OnInit, ChangeDetectorRef }     from '@angular/core'
import { Store, select }          from '@ngrx/store'
import { AngularFireAuth }        from 'angularfire2/auth'
import { Observable }             from 'rxjs'

import user, { User }                   from '@shared/models/user'

import * as actions               from '@core/store/auth/actions/auth'
import * as layoutActions         from '@core/store/layouts/actions/layout'
import * as fromRoot              from '@core/store'

import { RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'gen-layout-no-footer',
  templateUrl: './layout-no-footer.component.html',
  styleUrls: ['./layout-no-footer.component.scss']
})
export class LayoutNoFooterComponent {

  authUser$: Observable<User>
  isSignedIn$: Observable<boolean>
  showSidenav$: Observable<boolean>
  logo$: Observable<string>
  router$: Observable<RouterStateSnapshot>

  constructor(
    private _store: Store<fromRoot.State>,
    private afAuth: AngularFireAuth,
    private cdRef: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this.authUser$ = this._store.select(fromRoot.getAuthUser)
    this.isSignedIn$ = this._store.select(fromRoot.getIsSignedIn)
    this.showSidenav$ = this._store.pipe(select(fromRoot.getShowSidenav));
    this.logo$ = this._store.pipe(select(fromRoot.getLogo));
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  closeSidenav() {
    this._store.dispatch(new layoutActions.CloseSidenav());
  }

  openSidenav() {
    this._store.dispatch(new layoutActions.OpenSidenav());
  }

  signOut() {
    this._store.dispatch(new actions.SignOut());
  }
}
