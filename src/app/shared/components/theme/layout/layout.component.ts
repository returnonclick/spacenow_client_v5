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
export class LayoutComponent {

  authUser$: Observable<User>
  isSignedIn$: Observable<boolean>
  showSidenav$: Observable<boolean>
  sidenavComponent$: Observable<string>
  sidenavComponent: string
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
    this.sidenavComponent$ = this._store.pipe(select(fromRoot.getSidenavComponent));
    this.sidenavComponent$.subscribe( (sidenavComponent) =>  this.sidenavComponent = sidenavComponent)
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

  setSidenavLogin() {
    this._store.dispatch(new layoutActions.SetSidenavLogin());
  }

  setSidenavRegister() {
    this._store.dispatch(new layoutActions.SetSidenavRegister());
  }

  signOut() {
    this._store.dispatch(new actions.SignOut());
  }
}
