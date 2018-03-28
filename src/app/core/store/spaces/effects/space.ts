import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, filter, switchMap, catchError, mergeMap } from 'rxjs/operators';

import { SpaceService } from '@core/store/spaces/services/space'
import { Space } from '@models/space'
import { ListingShortDetail } from '@models/listing-short-detail'

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
    switchMap(action => {
      this._isShortQuery = action.isShort
      return this._service.select(action.ids, action.isShort)
    }),
    mergeMap(actions => actions),
    map(action => {
      let data = action.payload.data()
      if(data) {
        let obj = this._isShortQuery
          ? new ListingShortDetail(action.payload.data())
          : new Space(action.payload.data())
        return new actions.Added(obj)
      }
    }),
    filter((action, i) => !!action)
  )

  @Effect()
  filter$ = this._actions$.pipe(
    ofType<actions.Filter>(actions.FILTER),
    switchMap(action => {
      this._isShortQuery = action.isShort
      return this._service.filter(action.params)
    }),
    map(changes =>
      changes.map(change => {
        let space = change.doc.data() as (Space | ListingShortDetail)
        return space.id
      })
    ),
    map(spaceIds => new actions.Select(spaceIds, this._isShortQuery))
  )

  @Effect()
  success$ = this._actions$.pipe(
    ofType(actions.ADDED, actions.REMOVED, actions.MODIFIED),
    map(action => new actions.Success)
  )

  private _isShortQuery: boolean = false

  constructor(
    private _actions$: Actions,
    private _service:  SpaceService,
  ) { }

}
