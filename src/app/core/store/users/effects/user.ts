import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';

import { User } from '@shared/models/user'
import { UserService } from '@core/store/users/services'

import * as actions from '@core/store/users/actions/user'

@Injectable()
export class UserEffects {

    @Effect()
    public query$: Observable<Action> = this.actions$.pipe(
        ofType<actions.Query>( actions.QUERY ),
        switchMap( action  => this.userService.readAll() ),
        mergeMap( actions => actions ),
        map( action => {
            return {
                type: `[User] ${action.type}`,
                payload: {
                    id: action.payload.doc.id,
                    ...action.payload.doc.data()
                }
            }
        } )
    )

    @Effect()
    public readRoleByUser$: Observable<Action> = this.actions$.pipe(
        ofType<actions.ReadRoleByUser>( actions.READ_ROLE_BY_USER ),
        switchMap( payload  => payload.role),
        map(role => this.userService.readRoleByUser(role)),
        mergeMap( actions => actions ),
        switchMap( action => action ),
        map( action => {
            return {
                type: `[User] ${action.type} ${action.payload.doc.data().roles}`,
                payload: {
                    id: action.payload.doc.id,
                    ...action.payload.doc.data(),
                }
            } 
        } )  
    )  
    
    @Effect()
    public create$: Observable<Action> = this.actions$.pipe(
        ofType<actions.Create>(actions.CREATE),
        switchMap(data => Observable.fromPromise(this.userService.create(data.payload))
        ),
        map(() => new actions.Success())
    )

    @Effect()
    public update$: Observable<Action> = this.actions$.pipe(
        ofType<actions.Update>(actions.UPDATE),
        switchMap(data => Observable.fromPromise(this.userService.update(data.id, data.changes))
        ),
        map(() => new actions.Success())
    )

    @Effect()
    public delete$: Observable<Action> = this.actions$.pipe(
        ofType<actions.Delete>(actions.DELETE),
        switchMap(data => Observable.fromPromise(this.userService.delete(data.id))
        ),
        map(() => new actions.Success())
    )

    constructor(
        private actions$: Actions,
        private userService: UserService
    ) {
    }
}
