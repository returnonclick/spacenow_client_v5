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
  selector: 'gen-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

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
    this.authUser$ = this._store.select(fromRoot.getSelectedAuth)
    this.isSignedIn$ = this._store.select(fromRoot.getIsSignedInState)
    this.showSidenav$ = this._store.pipe(select(fromRoot.getShowSidenav));
    this.logo$ = this._store.pipe(select(fromRoot.getLogo));
    //this.router$ = this._store.pipe(select(fromRoot.getRouter));
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  ngOnInit() {
    this.afAuth.authState.subscribe((userData) => { 
      console.log(userData)
      return userData ? this._store.dispatch(new actions.GetUser(userData.uid)) : null })
    //this.router$.subscribe(router => console.log(router))
  }

  closeSidenav() {
    this._store.dispatch(new layoutActions.CloseSidenav());
  }

  openSidenav() {
    this._store.dispatch(new layoutActions.OpenSidenav());
  }

  signOut() {
    this._store.dispatch(new actions.SignOut);
  }
}
