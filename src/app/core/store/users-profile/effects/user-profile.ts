import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';

import { Profile } from '@shared/models/profile'
import { UserProfileService } from '@core/store/users-profile/services'

import * as actions from '@core/store/users-profile/actions/user-profile'

@Injectable()
export class UserProfileEffects {

    @Effect()
    public query$: Observable<Action> = this.actions$.pipe(
        ofType<actions.Query>( actions.QUERY ),
        switchMap( action  => this.userProfileService.read(action.uid) ),
        mergeMap( actions => actions ),
        map( action => {
            return {
                type: `[Profile] ${action.type}`,
                payload: {
                    id: action.payload.doc.id,
                    ...action.payload.doc.data()
                }
            }
        } )
    )  

    @Effect()
    public update$: Observable<Action> = this.actions$.pipe(
        ofType<actions.Update>(actions.UPDATE),
        switchMap(data => 
            Observable.fromPromise(this.userProfileService.update(data.id, data.changes))
        ),
        map(() => new actions.Success())
    )

    constructor(
        private actions$: Actions,
        private userProfileService: UserProfileService
    ) {
    }
}
