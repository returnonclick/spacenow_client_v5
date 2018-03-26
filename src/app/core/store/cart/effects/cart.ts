import { Injectable } from '@angular/core'
import { Action } from '@ngrx/store'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Observable } from 'rxjs'
import { map, switchMap, catchError } from 'rxjs/operators'

import { CartService } from '@core/store/cart/services/cart'

import * as actions from '@core/store/cart/actions/cart'

@Injectable()
export class CartEffects {

  @Effect()
  request$ = this._actions$.pipe(
    ofType<actions.Request>(actions.REQUEST),
    switchMap(action => this._service.request(action.space)),
    map(action => new actions.RequestSuccess),
    catchError(err => Observable.of(new actions.RequestFail(err)))
  )

  constructor(
    private _actions$: Actions,
    private _service:  CartService,
  ) { }

}
