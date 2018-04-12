import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Effect, Actions, ofType } from '@ngrx/effects'
import { AngularFireAuth } from 'angularfire2/auth'
import { map, switchMap } from 'rxjs/operators'

import * as firebase from 'firebase/app'

import { AuthService } from '@core/store/auth/services/auth'
import { User } from '@models/user'

import * as actions from '@core/store/auth/actions/auth'
import * as layoutActions from '@core/store/layouts/actions/layout'

@Injectable()
export class AuthEffects {

  @Effect()
  getUser$ = this.actions$.pipe(
    ofType<actions.GetUser>(actions.GET_USER),
    switchMap(() => this.afAuth.authState),
    switchMap(authState =>
      !authState ? Promise.resolve(null) : this.authService.getUser(authState.uid)
    ),
    map(action => {
      let data = action ? action.data() : null
      return new actions.Success({
        user: data ? new User(data) : null
      })
    })
  )

  @Effect()
  signIn$ = this.actions$.pipe(
    ofType<actions.SignIn>( actions.SIGN_IN ),
    switchMap(data =>
      this.authService.signIn(data.payload.username, data.payload.password)
        .then(() => new actions.GetUser())
        .catch((err) => new actions.Fail(err))
    )
  )

  @Effect()
  signUp$ = this.actions$.pipe(
    ofType<actions.SignUp>( actions.SIGN_UP ),
    switchMap(data =>
      this.authService.signUp(data.payload.username, data.payload.password)
        .then(user => {
          this.authService.sendEmailVerification()
          return new actions.GetUser()
        })
        .catch(err => new actions.Fail(err))
    )
  )

  @Effect()
  forgotPassword$ = this.actions$.pipe(
    ofType<actions.ForgotPassword>( actions.FORGOT_PASSWORD ),
    switchMap((data) =>
      this.authService.sendPasswordResetEmail(data.payload.email)
        .then(() => new actions.Success())
        .catch(err => new actions.Fail(err))
    )
  )

  @Effect()
  signInWithProvider$ = this.actions$.pipe(
    ofType<actions.SignInWithProvider>(actions.SIGN_IN_WITH_PROVIDER),
    switchMap(data =>
      this.authService.signInWithProvider(data.payload)
        .then(() => new actions.GetUser)
        .catch(err => new actions.Fail(err))
    )
  )

  @Effect()
  success$ = this.actions$.pipe(
    ofType<actions.Success>(actions.SUCCESS),
    map(() => new layoutActions.CloseSidenav)
  )

  @Effect({ dispatch: false })
  signout$ = this.actions$.pipe(
    ofType<actions.SignOut>(actions.SIGN_OUT),
    map(() => this.authService.signOut()),
    map(() => this.router.navigate[''])
  )

  @Effect({ dispatch: false })
  fail$ = this.actions$.pipe(
    ofType<actions.Fail>(actions.FAIL),
    map(err => err.payload)
  )

  constructor(
    private actions$:    Actions,
    private authService: AuthService,
    private router:      Router,
    public afAuth:       AngularFireAuth
  ) { }

}
