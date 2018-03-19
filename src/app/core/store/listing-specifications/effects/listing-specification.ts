import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';

import { ListingSpecification } from '@shared/models/listing-specification'
import { ListingSpecificationService } from '@core/store/listing-specifications/services/listing-specification'

import * as actions from '@core/store/listing-specifications/actions/listing-specification'

@Injectable()
export class ListingSpecificationEffects {

    @Effect()
    public query$: Observable<Action> = this.actions$.pipe(
        ofType<actions.Query>( actions.QUERY ),
        switchMap( action  => this.listingSpecificationService.readAll() ),
        mergeMap( actions => actions ),
        map( action => {
            return {
                type: `[ListingSpecification] ${action.type}`,
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
        switchMap(data => Observable.fromPromise(this.listingSpecificationService.create(data.payload))),
        map(() => new actions.Success())
    )

    @Effect()
    public update$: Observable<Action> = this.actions$.pipe(
        ofType<actions.Update>(actions.UPDATE),
        switchMap(data => Observable.fromPromise(this.listingSpecificationService.update(data.id, data.changes))
        ),
        map(() => new actions.Success())
    )

    @Effect()
    public delete$: Observable<Action> = this.actions$.pipe(
        ofType<actions.Delete>(actions.DELETE),
        switchMap(data => Observable.fromPromise(this.listingSpecificationService.delete(data.id))
        ),
        map(() => new actions.Success())
    )

    constructor(
        private actions$: Actions,
        private listingSpecificationService: ListingSpecificationService
    ) {
    }
}
