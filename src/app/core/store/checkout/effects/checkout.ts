import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Observable } from 'rxjs'
import { map, switchMap, catchError } from 'rxjs/operators'

import { CheckoutService } from '@core/store/checkout/services/checkout'

import * as actions from '@core/store/checkout/actions/checkout'

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

  constructor(
    private _actions$: Actions,
    private _service: CheckoutService,
  ) { }

}
