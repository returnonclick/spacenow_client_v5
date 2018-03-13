import { Injectable, InjectionToken, Optional, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import * as firebase from 'firebase/app'
import { Observable } from 'rxjs/Observable';
import { Scheduler } from 'rxjs/Scheduler';
import { async } from 'rxjs/scheduler/async';
import { of } from 'rxjs/observable/of';
import { tap, map, exhaustMap, catchError, switchMap, mergeMap } from 'rxjs/operators';
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
    public getUser$: Observable<Action> = this.actions$.pipe(
        ofType<actions.GetUser>( actions.GET_USER ),
        exhaustMap(payload => this.authService.getUser(payload.uid)),
        mergeMap( actions => actions ),
        tap(() => new layoutActions.CloseSidenav()),
        map( action => {
            return {
                type: `[Auth] ${action.type}`,
                payload: {
                    id: action.payload.doc.id,
                    ...action.payload.doc.data()
                }
            }
        }),
        catchError((err) => of(new actions.Fail(err)))
    )

    @Effect()
    public signIn$: Observable<Action> = this.actions$.pipe(
        ofType<actions.SignIn>( actions.SIGN_IN ),
        switchMap(data => this.authService.signIn(data.payload.username, data.payload.password)),
        map((res) => new actions.GetUser(res.uid)),
        catchError((err) => of(new actions.Fail(err)))
    )

    @Effect()
    public signUp$: Observable<Action> = this.actions$.pipe(
        ofType<actions.SignUp>( actions.SIGN_UP ),
        switchMap(data => this.authService.signUp(data.payload.username, data.payload.password)),
        tap(() => this.authService.sendEmailVerification()),
        map((user) => new actions.GetUser(user.uid)),
        catchError((err) => of(new actions.Fail(err)))
    )

    @Effect()
    public forgotPassword$: Observable<Action> = this.actions$.pipe(
        ofType<actions.ForgotPassword>( actions.FORGOT_PASSWORD ),
        switchMap(data => this.authService.sendPasswordResetEmail(data.payload.email).then(
            (msg) => 'Password Reset Email sent successfuly'
        )),
        map((msg) => new actions.Success(msg)),
        catchError((err) => of(new actions.Fail(err)))
    )

    @Effect()
    public signInWithProvider$: Observable<Action> = this.actions$.pipe(
        ofType<actions.SignInWithProvider>( actions.SIGN_IN_WITH_PROVIDER ),
        switchMap(data => this.authService.signInWithProvider(data.payload)),
        map((user) => new actions.GetUser(user.uid)),
        catchError((err) => of(new actions.Fail(err)))
    )

    @Effect({ dispatch: false })
    public success$: Observable<Action> = this.actions$.pipe(
        ofType<actions.Success>( actions.SUCCESS ),
        tap(() => new layoutActions.CloseSidenav()),
        catchError((err) => of(new actions.Fail(err)))
    );

    @Effect({ dispatch: false })
    public signout$: Observable<Action> = this.actions$.pipe(
        ofType<actions.SignOut>( actions.SIGN_OUT ),
        tap(() => this.authService.signOut()),
        tap(() => new layoutActions.CloseSidenav()),
        tap(() => this.router.navigate(['']))
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
