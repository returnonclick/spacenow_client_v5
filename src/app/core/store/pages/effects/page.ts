import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';

import { Page } from '@shared/models/page'
import { PageService } from '@core/store/pages/services/page'

import * as actions from '@core/store/pages/actions/page'

@Injectable()
export class PageEffects {

    @Effect()
    public query$: Observable<Action> = this.actions$.pipe(
        ofType<actions.Query>( actions.QUERY ),
        switchMap( action  => {
            console.log('action')
            return this.pageService.readAll()
        } ),
        mergeMap( actions => actions ),
        map( action => {
            console.log('effect')
            return {
                type: `[Page] ${action.type}`,
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
        switchMap(data => Observable.fromPromise(this.pageService.create(data.payload))),
        map(() => new actions.Success())
    )

    @Effect()
    public update$: Observable<Action> = this.actions$.pipe(
        ofType<actions.Update>(actions.UPDATE),
        switchMap(data => Observable.fromPromise(this.pageService.update(data.id, data.changes))
        ),
        map(() => new actions.Success())
    )

    @Effect()
    public delete$: Observable<Action> = this.actions$.pipe(
        ofType<actions.Delete>(actions.DELETE),
        switchMap(data => Observable.fromPromise(this.pageService.delete(data.id))
        ),
        map(() => new actions.Success())
    )

    constructor(
        private actions$: Actions,
        private pageService: PageService
    ) {
    }
}
