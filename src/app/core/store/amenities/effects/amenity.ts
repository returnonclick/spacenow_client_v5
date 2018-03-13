import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';

import { Amenity } from '@shared/models/amenity'
import { AmenityService } from '@core/store/amenities/services/amenity'

import * as actions from '@core/store/amenities/actions/amenity'

@Injectable()
export class AmenityEffects {

    @Effect()
    public query$: Observable<Action> = this.actions$.pipe(
        ofType<actions.Query>( actions.QUERY ),
        switchMap( action  => this.amenityService.readAll() ),
        mergeMap( actions => actions ),
        map( action => {
            return {
                type: `[Amenity] ${action.type}`,
                payload: {
                    id: action.payload.doc.id,
                    ...action.payload.doc.data()
                }
            }
        } )
    )

    @Effect()
    public create$: Observable<Action> = this.actions$.pipe(
        ofType<actions.Create>( actions.CREATE ),
        switchMap(data => Observable.fromPromise(this.amenityService.create(data.payload))),
        map(() => new actions.Success())
    )

    @Effect()
    public update$: Observable<Action> = this.actions$.pipe(
        ofType<actions.Update>(actions.UPDATE),
        switchMap(data => Observable.fromPromise(this.amenityService.update(data.id, data.changes))
        ),
        map(() => new actions.Success())
    )

    @Effect()
    public delete$: Observable<Action> = this.actions$.pipe(
        ofType<actions.Delete>(actions.DELETE),
        switchMap(data => Observable.fromPromise(this.amenityService.delete(data.id))
        ),
        map(() => new actions.Success())
    )

    constructor(
        private actions$: Actions,
        private amenityService: AmenityService
    ) {
    }
}
