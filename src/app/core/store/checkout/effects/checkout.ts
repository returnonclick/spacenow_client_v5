import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Observable } from 'rxjs'
import { map, switchMap, catchError } from 'rxjs/operators'

import { CheckoutService } from '@core/store/checkout/services/checkout'

import * as actions from '@core/store/checkout/actions/checkout'
import * as cartActions from '@core/store/cart/actions/cart'

@Injectable()
export class CheckoutEffects {

  @Effect()
  checkout$ = this._actions$.pipe(
    ofType<actions.Checkout>(actions.CHECKOUT),
    switchMap(action => this._service.checkout(action.booking)),
    map(bookingId => new actions.CheckoutSuccess(bookingId)),
    catchError(err =>
      Observable.of(new actions.CheckoutFail(err))
    ),
  )

  @Effect()
  success$ = this._actions$.pipe(
    ofType<actions.CheckoutSuccess>(actions.CHECKOUT_SUCCESS),
    map(actions => new cartActions.Clear)
  )

  constructor(
    private _actions$: Actions,
    private _service: CheckoutService,
  ) { }

}
