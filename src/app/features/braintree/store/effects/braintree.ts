import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Observable } from 'rxjs'
import { catchError, map, switchMap } from 'rxjs/operators'

import { BraintreeService } from '@features/braintree/store/services/braintree'

import * as actions from '@features/braintree/store/actions/braintree'

@Injectable()
export class BraintreeEffects {

  @Effect()
  getClientToken$ = this._actions$.pipe(
    ofType<actions.GetClientToken>(actions.GET_CLIENT_TOKEN),
    switchMap(action => this._service.getClientToken(action.customerId)),
    map(token => new actions.GetClientTokenSuccess(token)),
    catchError(err =>
      Observable.of(new actions.GetClientTokenFail(err))
    ),
  )

  @Effect()
  requestNonce$ = this._actions$.pipe(
    ofType<actions.RequestNonce>(actions.REQUEST_NONCE),
    switchMap(action => this._service.requestNonce(action.instance)),
    map((response: any) => new actions.RequestNonceSuccess(response.nonce)),
    catchError(err =>
      Observable.of(new actions.RequestNonceFail(err))
    ),
  )

  @Effect()
  pay$ = this._actions$.pipe(
    ofType<actions.Pay>(actions.PAY),
    switchMap(action => this._service.payBooking(action.nonce, action.paymentDetails)),
    map(response => new actions.PaySuccess()),
    catchError(err =>
      Observable.of(new actions.PayFail(err))
    )
  )

  constructor(
    private _actions$: Actions,
    private _service: BraintreeService
  ) { }

}
