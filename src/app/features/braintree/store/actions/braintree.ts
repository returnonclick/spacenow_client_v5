import { Action } from '@ngrx/store'

import { PaymentBooking } from '@features/braintree/models/payment-booking'

export const GET_CLIENT_TOKEN         = '[Braintree] GET CLIENT TOKEN'
export const GET_CLIENT_TOKEN_SUCCESS = '[Braintree] GET CLIENT TOKEN SUCCESS'
export const GET_CLIENT_TOKEN_FAIL    = '[Braintree] GET CLIENT TOKEN FAIL'
export const REQUEST_NONCE            = '[Braintree] REQUEST NONCE'
export const REQUEST_NONCE_SUCCESS    = '[Braintree] REQUEST NONCE SUCCESS'
export const REQUEST_NONCE_FAIL       = '[Braintree] REQUEST NONCE FAIL'
export const PAY                      = '[Braintree] PAY'
export const PAY_SUCCESS              = '[Braintree] PAY SUCCESS'
export const PAY_FAIL                 = '[Braintree] PAY FAIL'

export class GetClientToken implements Action {
  readonly type = GET_CLIENT_TOKEN
  constructor(public customerId: string) { }
}

export class GetClientTokenSuccess implements Action {
  readonly type = GET_CLIENT_TOKEN_SUCCESS
  constructor(public clientToken: string) { }
}

export class GetClientTokenFail implements Action {
  readonly type = GET_CLIENT_TOKEN_FAIL
  constructor(public err: any) { }
}

export class RequestNonce implements Action {
  readonly type = REQUEST_NONCE
  constructor(public instance: any) { }
}

export class RequestNonceSuccess implements Action {
  readonly type = REQUEST_NONCE_SUCCESS
  constructor(public nonce: string) { }
}

export class RequestNonceFail implements Action {
  readonly type = REQUEST_NONCE_FAIL
  constructor(public error: any) { }
}

export class Pay implements Action {
  readonly type = PAY
  constructor(
    public nonce: string,
    public paymentDetails: PaymentBooking,
    public redirectUrl: string = '',
  ) { }
}

export class PaySuccess implements Action {
  readonly type = PAY_SUCCESS
  constructor(public redirectUrl: string = '') { }
}

export class PayFail implements Action {
  readonly type = PAY_FAIL
  constructor(public error: any) { }
}

export type BraintreeActions
  = GetClientToken
  | GetClientTokenSuccess
  | GetClientTokenFail
  | RequestNonce
  | RequestNonceSuccess
  | RequestNonceFail
  | Pay
  | PaySuccess
  | PayFail
