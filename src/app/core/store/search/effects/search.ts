import { Injectable } from '@angular/core'
import { Action } from '@ngrx/store'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/observable/of'
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators'

import { ListingShortDetail } from '@shared/models/listing-short-detail'
import { SearchService } from '@core/store/search/services/search'

import * as actions from '@core/store/search/actions/search'

@Injectable()
export class SearchEffects {

  @Effect()
  query$ = this._actions$.pipe(
    ofType<actions.Query>(actions.QUERY),
    switchMap(action => this._service.query(action.params)),
    mergeMap(changes => changes),
    map(action => {
      return {
        type: `[Search] ${action.type}`,
        payload: action.doc.data()
      }
    })
  )

  constructor(
    private _actions$: Actions,
    private _service: SearchService
  ) { }

}
