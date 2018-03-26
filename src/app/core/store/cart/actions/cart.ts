import { Action } from '@ngrx/store'

import { BookingRequest, BookingSpace } from '@models/booking'

export const ADD             = '[Cart] add'
export const REMOVE          = '[Cart] remove'
export const CLEAR           = '[Cart] clear'

export const REQUEST         = '[Cart] request'
export const REQUEST_SUCCESS = '[Cart] request success'
export const REQUEST_FAIL    = '[Cart] request fail'

export class Add implements Action {
  readonly type = ADD
  constructor(public item: BookingSpace) { }
}

export class Remove implements Action {
  readonly type = REMOVE
  constructor(public id: string) { }
}

export class Clear implements Action {
  readonly type = CLEAR
  constructor() { }
}

export class Request implements Action {
  readonly type = REQUEST
  constructor(public space: BookingRequest) { }
}

export class RequestSuccess implements Action {
  readonly type = REQUEST_SUCCESS
  constructor() { }
}

export class RequestFail implements Action {
  readonly type = REQUEST_FAIL
  constructor(public error: any) { }
}

export type CartActions
  = Add
  | Remove
  | Clear
  | Request
  | RequestSuccess
  | RequestFail
