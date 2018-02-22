import { Injectable, InjectionToken, Optional, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import * as firebase from 'firebase/app'
import { Observable } from 'rxjs/Observable';
import { Scheduler } from 'rxjs/Scheduler';
import { async } from 'rxjs/scheduler/async';
import { of } from 'rxjs/observable/of';
import { tap, map, exhaustMap, catchError, switchMap } from 'rxjs/operators';
import { AuthService } from '@core/store/auth/services/auth';
import { User } from '@shared/models/user';
import { AngularFireAuth } from 'angularfire2/auth'

import * as actions from '../actions/auth';

@Injectable()
export class AuthEffects {

    @Effect()
    public getUser$: Observable<Action> = this.actions$.pipe(
        ofType<actions.GetUser>( actions.GET_USER ),
        exhaustMap(payload => this.authService.getUser(payload.user.uid)),
        map((user) => new actions.Success(user)),
        catchError((err) => of(new actions.Fail(err)))
    )

    @Effect()
    public signIn$: Observable<Action> = this.actions$.pipe(
        ofType<actions.SignIn>( actions.SIGN_IN ),
        switchMap(data => this.authService.signIn(data.payload.username, data.payload.password)),
        map((user) => new actions.GetUser(user)),
        catchError((err) => of(new actions.Fail(err)))
    )

    @Effect()
    public signInWithProvider$: Observable<Action> = this.actions$.pipe(
        ofType<actions.SignInWithProvider>( actions.SIGN_IN_WITH_PROVIDER ),
        switchMap(data => this.authService.signInWithProvider(data.payload)),
        map((user) => new actions.GetUser(user)),
        catchError((err) => of(new actions.Fail(err)))
    )

    @Effect({ dispatch: false })
    success$ = this.actions$.pipe(
        ofType(actions.SUCCESS),
        tap(() => this.router.navigate(['/'])),
        catchError((err) => of(new actions.Fail(err)))
    );

    @Effect({ dispatch: false })
    fail$ = this.actions$.pipe(
        ofType(actions.FAIL, actions.SIGN_OUT),
        map(() => this.authService.signOut()),
        tap(() => this.router.navigate(['/']))
    );

    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private router: Router,
        public afAuth: AngularFireAuth
    ) {
    }
}
