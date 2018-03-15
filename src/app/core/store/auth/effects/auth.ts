import { Injectable, InjectionToken, Optional, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import * as firebase from 'firebase/app'
import { Observable } from 'rxjs/Observable';
import { Scheduler } from 'rxjs/Scheduler';
import { async } from 'rxjs/scheduler/async';
import { of } from 'rxjs/observable/of';
import { tap, map, exhaustMap, concatMap, catchError, switchMap, mergeMap, debounceTime, share } from 'rxjs/operators';
import { AuthService } from '@core/store/auth/services/auth';
import { User } from '@shared/models/user';
import { AngularFireAuth } from 'angularfire2/auth'
import { Store, State } from '@ngrx/store'

import * as fromRoot from '@core/store'
import * as actions from '@core/store/auth/actions/auth';
import * as layoutActions from '@core/store/layouts/actions/layout';

@Injectable()
export class AuthEffects {

    @Effect()
    public signIn$: Observable<Action> = this.actions$.pipe(
        ofType<actions.SignIn>( actions.SIGN_IN ),
        switchMap((data) => 
            this.authService.signIn(data.payload.username, data.payload.password)
            .then((user) => new actions.Success({user: new User(user)}))
            .catch((err) => new actions.Fail(err))
        )
    )

    @Effect()
    public signUp$: Observable<Action> = this.actions$.pipe(
        ofType<actions.SignUp>( actions.SIGN_UP ),
        switchMap(data => 
            this.authService.signUp(data.payload.username, data.payload.password)
            .then((user) => {
                this.authService.sendEmailVerification()
                return new actions.Success()
            })
            .catch((err) => new actions.Fail(err))
        )
    )

    @Effect()
    public forgotPassword$: Observable<Action> = this.actions$.pipe(
        ofType<actions.ForgotPassword>( actions.FORGOT_PASSWORD ),
        switchMap((data) => 
            this.authService.sendPasswordResetEmail(data.payload.email)
            .then(() => new actions.Success())
            .catch((err) => new actions.Fail(err))
        )
    )

    @Effect()
    public signInWithProvider$: Observable<Action> = this.actions$.pipe(
        ofType<actions.SignInWithProvider>( actions.SIGN_IN_WITH_PROVIDER ),
        switchMap((data) => 
            this.authService.signInWithProvider(data.payload)
            .then((user) => new actions.Success(new User(user)))
            .catch((err) => new actions.Fail(err))
        )
    )

    @Effect()
    public success$: Observable<Action> = this.actions$.pipe(
        ofType<actions.Success>( actions.SUCCESS ),
        map((payload) => payload),
        map(() => new layoutActions.CloseSidenav())
    );

    @Effect({ dispatch: false })
    public signout$: Observable<Action> = this.actions$.pipe(
        ofType<actions.SignOut>( actions.SIGN_OUT ),
        tap(() => this.authService.signOut()),
        map(() => this.router.navigate[''])
    )

    @Effect({ dispatch: false })
    public redirect$: Observable<Action> = this.actions$.pipe(
        ofType<actions.Redirect>( actions.REDIRECT ),
        map(() => this.router.navigate[''])
    )

    @Effect({ dispatch: false })
    public fail$: Observable<Action> = this.actions$.pipe(
        ofType<actions.Fail>( actions.FAIL ),
        map(err => err.payload)
    );

    constructor(
        private _store: Store<fromRoot.State>,
        private actions$: Actions,
        private authService: AuthService,
        private router: Router,
        public afAuth: AngularFireAuth
    ) {
    }
}
