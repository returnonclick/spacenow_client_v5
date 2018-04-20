import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';

import { ListingShortDetail } from '@shared/models/listing-short-detail'
import { ListingShortDetailService } from './listing-short-detail.service'

import * as actions from './listing-short-detail.action'

@Injectable()
export class ListingShortDetailEffects {

    @Effect()
    public query$: Observable<Action> = this.actions$.pipe(
        ofType<actions.Query>( actions.QUERY ),
        switchMap( action  => this.listingShortDetailService.readAll() ),
        map( action => new actions.Added(action)),
        catchError( (err) => of(new actions.Fail(err)) )
    )

    constructor(
        private actions$: Actions,
        private listingShortDetailService: ListingShortDetailService
    ) {
    }
}
