import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';

import { Space } from '@shared/models/space'
import { ListingService } from '@core/store/listings/services/listing'

import * as actions from '@core/store/listings/actions/listing'

@Injectable()
export class ListingEffects {

    @Effect()
    public query$: Observable<Action> = this.actions$.pipe(
        ofType<actions.Query>( actions.QUERY ),
        switchMap( action  => this.listingService.readAll() ),
        mergeMap( actions => actions ),
        map( action => {
            return {
                type: `[Listing] ${action.type}`,
                payload: {
                    id: action.payload.doc.id,
                    ...action.payload.doc.data()
                }
            }
        } )
    )

     @Effect()
    public queryOne$: Observable<Action> = this.actions$.pipe(
        ofType<actions.QueryOne>( actions.QUERY_ONE ),
        switchMap( action  => this.listingService.readOne(action.id) ),
        mergeMap( actions => actions ),
        map( action => {
            return {
                type: `[Listing] ${action.type}`,
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
        switchMap(data => Observable.fromPromise(this.listingService.create(data.payload))),
        map(() => new actions.Success()),
    )

    @Effect()
    public update$: Observable<Action> = this.actions$.pipe(
        ofType<actions.Update>(actions.UPDATE),
        switchMap(data => Observable.fromPromise(this.listingService.update(data.id, data.changes))
        ),
        map(() => new actions.Success())
    )

    @Effect()
    public delete$: Observable<Action> = this.actions$.pipe(
        ofType<actions.Delete>(actions.DELETE),
        switchMap(data => Observable.fromPromise(this.listingService.delete(data.id))
        ),
        map(() => new actions.Success())
    )

    constructor(
        private actions$: Actions,
        private listingService: ListingService
    ) {
    }
}
