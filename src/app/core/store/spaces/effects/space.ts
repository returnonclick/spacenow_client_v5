import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';

import { SpaceService } from '@core/store/spaces/services/space'
import { Space } from '@models/space'

import * as actions from '@core/store/spaces/actions/space'

@Injectable()
export class SpaceEffects {

  @Effect()
  all$ = this._actions$.pipe(
    ofType<actions.All>(actions.ALL),
    switchMap(action => this._service.readAll()),
    mergeMap(actions => actions),
    map(action => {
      return {
        type:    `[Spaces] ${action.type}`,
        payload: new Space(action.doc.data())
      }
    })
  )

  @Effect()
  select$ = this._actions$.pipe(
    ofType<actions.Select>(actions.SELECT),
    switchMap(action => this._service.select(action.ids)),
    mergeMap(actions => actions),
    map(action =>
      new actions.Added(
        new Space(action.payload.data())
      )
    )
  )

  @Effect()
  filter$ = this._actions$.pipe(
    ofType<actions.Filter>(actions.FILTER),
    switchMap(action => this._service.filter(action.params)),
    mergeMap(docChanges => docChanges),
    map(change => {
      return {
        type:    `[Spaces] ${change.type}`,
        payload: new Space(change.doc.data())
      }
    })
  )

  @Effect()
  success$ = this._actions$.pipe(
    ofType(actions.ADDED, actions.REMOVED, actions.MODIFIED),
    map(action => new actions.Success)
  )

  constructor(
    private _actions$: Actions,
    private _service:  SpaceService,
  ) { }

}
