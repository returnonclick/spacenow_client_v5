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
        type: `[Spaces] ${action.type}`,
        payload: action.payload.doc.data()
      }
    })
  )

  @Effect()
  select$ = this._actions$.pipe(
    ofType<actions.Select>(actions.SELECT),
    switchMap(action => this._service.readOne(action.id)),
    map(space => new actions.Success(space))
  )

  constructor(
    private _actions$: Actions,
    private _service:  SpaceService,
  ) { }

}
