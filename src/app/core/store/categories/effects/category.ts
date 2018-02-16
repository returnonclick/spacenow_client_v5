import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';

import { Category } from '@shared/models/category'
import { CategoryService } from '@core/store/categories/services/category'

import * as actions from '@core/store/categories/actions/category'

@Injectable()
export class CategoryEffects {

    @Effect()
    public query$: Observable<Action> = this.actions$.pipe(
        ofType<actions.Query>( actions.QUERY ),
        switchMap( action  => this.categoryService.readAll() ),
        mergeMap( actions => actions ),
        map( action => {
            return {
                type: `[Category] ${action.type}`,
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
        switchMap(data => Observable.fromPromise(this.categoryService.create(data.payload))),
        map(() => new actions.Success())
    )

    @Effect()
    public update$: Observable<Action> = this.actions$.pipe(
        ofType<actions.Update>(actions.UPDATE),
        switchMap(data => Observable.fromPromise(this.categoryService.update(data.id, data.changes))
        ),
        map(() => new actions.Success())
    )

    @Effect()
    public delete$: Observable<Action> = this.actions$.pipe(
        ofType<actions.Delete>(actions.DELETE),
        switchMap(data => Observable.fromPromise(this.categoryService.delete(data.id))
        ),
        map(() => new actions.Success())
    )

    constructor(
        private actions$: Actions,
        private categoryService: CategoryService
    ) {
    }
}
