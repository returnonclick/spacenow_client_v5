import { Action } from '@ngrx/store'

import { Booking } from '@models/booking'

export const CHECKOUT         = '[Checkout] CHECKOUT'
export const CHECKOUT_SUCCESS = '[Checkout] CHECKOUT SUCCESS'
export const CHECKOUT_FAIL    = '[Checkout] CHECKOUT FAIL'

export class Checkout implements Action {
  readonly type = CHECKOUT
  constructor(public booking: Booking) { }
}

export class CheckoutSuccess implements Action {
  readonly type = CHECKOUT_SUCCESS
  constructor(public bookingId: string) { }
}

export class CheckoutFail implements Action {
  readonly type = CHECKOUT_FAIL
  constructor(public error: any) { }
}

export type CheckoutActions
  = Checkout
  | CheckoutSuccess
  | CheckoutFail
