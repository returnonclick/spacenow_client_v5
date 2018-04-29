import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { map, filter, switchMap, mergeMap } from 'rxjs/operators'

import { SpaceService } from '@core/store/spaces/services/space'
import { Space } from '@models/space'
import { ListingShortDetail } from '@models/listing-short-detail'

import * as spaceActions from '@core/store/spaces/actions/space'

@Injectable()
export class SpaceEffects {

  @Effect()
  all$ = this._actions$.pipe(
    ofType<spaceActions.All>(spaceActions.ALL),
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
    ofType<spaceActions.Select>(spaceActions.SELECT),
    switchMap(action => {
      this._isShortQuery = action.isShort
      return this._service.select(action.ids, action.isShort)
    }),
    map(actions =>
      new spaceActions.AddMany(
        actions.map(action => {
          let data = action.payload.data()
          if(data) {
            return this._isShortQuery
              ? new ListingShortDetail(data)
              : new Space(data)
          }
        }).filter(x => x)
      )
    ),
  )

  @Effect()
  filter$ = this._actions$.pipe(
    ofType<spaceActions.Filter>(spaceActions.FILTER),
    switchMap(action => {
      this._isShortQuery = action.isShort
      return this._service.filter(action.params)
    }),
    map(spaceIds => new spaceActions.Select(spaceIds, this._isShortQuery))
  )

  @Effect({ dispatch: true })
  related$ = this._actions$.pipe(
    ofType<spaceActions.Related>(spaceActions.RELATED),
    switchMap(action => this._service.related(action.spaceId)),
    map(action => {
      return new spaceActions.Added(
        new ListingShortDetail(action.payload.data())
      )
    })
  )

  @Effect()
  success$ = this._actions$.pipe(
    ofType(
      spaceActions.ADD_MANY,
      spaceActions.ADDED,
      spaceActions.REMOVED,
      spaceActions.MODIFIED
    ),
    map(action => new spaceActions.Success)
  )

  private _isShortQuery: boolean = false

  constructor(
    private _actions$: Actions,
    private _service:  SpaceService,
  ) { }

}
