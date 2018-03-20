import { Injectable } from '@angular/core'
import { Store, State, select } from '@ngrx/store'
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router'
import { AuthService } from '@core/store/auth/services/auth'

import { AngularFireAuth } from 'angularfire2/auth'

import * as fromRoot from '@core/store'
import * as actions from '@core/store/auth/actions/auth'

import { Observable } from 'rxjs/Observable'
import { map, take } from 'rxjs/operators'
import { of } from 'rxjs/observable/of';
import { logging } from 'selenium-webdriver'
import { catchError } from 'rxjs/operators/catchError';
import { auth } from 'firebase/app';


@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(
    private _store: Store<fromRoot.State>,
    private router: Router,
    public afAuth: AngularFireAuth
  ) {
    this.afAuth.authState.subscribe(
      (user) => {
        if (user)
          this._store.dispatch(new actions.GetUser)
      }
    )
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      return this.afAuth.authState.pipe(
        map(authState => {
          if (!authState) 
            this.router.navigate['']
            return !!authState
        }),
        take(1)
      )

    }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.canActivate(next, state)
    }

}

@Injectable()
export class AuthGuardVerified implements CanActivate, CanActivateChild {

  constructor(
    private _store: Store<fromRoot.State>,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      return this._store.pipe(
        select(fromRoot.getIsSignedIn),
        map(user => {
          if (!user) {
            return false
          }
          return true
        }),
        take(1)
      )

    }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.canActivate(next, state)
    }

}
