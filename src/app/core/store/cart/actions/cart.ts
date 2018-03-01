import { Action } from '@ngrx/store'

import { BookingSpace } from '@models/booking'

export const ADD = '[Cart] add'
export const REMOVE = '[Cart] remove'
export const CLEAR = '[Cart] clear'

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

export type CartActions
  = Add
  | Remove
  | Clear
