import { Injectable } from '@angular/core'
import { Action } from '@ngrx/store'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/Observable/of'
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators'

import { Space } from '@shared/models/space'
import { SearchService } from '@core/store/search/services/search'

import * as actions from '@core/store/search/actions/search'

@Injectable()
export class SearchEffects {

  @Effect()
  query$ = this._actions$.pipe(
    ofType<actions.Query>(actions.QUERY),
    switchMap(action => this._service.query(action.params)),
    map(spaces => new actions.Done(spaces))
  )

  constructor(
    private _actions$: Actions,
    private _service: SearchService
  ) { }

}
