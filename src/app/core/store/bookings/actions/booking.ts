import { Action } from '@ngrx/store'

import { Booking, BookingStatus } from '@models/booking'

export const QUERY     = '[Booking] query'
export const SELECT    = '[Booking] select'
export const FILTER    = '[Booking] filter'
export const BOOK      = '[Booking] book'
export const APPROVE   = '[Booking] approve'
export const REJECT    = '[Booking] reject'
export const CHECKOUT  = '[Booking] checkout'

export const ADDED     = '[Booking] added'
export const MODIFIED  = '[Booking] modified'
export const REMOVED   = '[Booking] removed'

export const SUCCESS   = '[Booking] success'
export const FAIL      = '[Booking] fail'

export class Query implements Action {
  readonly type = QUERY
  constructor(public userId: string) { }
}

export class Select implements Action {
  readonly type = SELECT
  constructor(public bookingId: string) { }
}

export class Filter implements Action {
  readonly type = FILTER
  constructor(
    public spaceIds: string[],
    public status: BookingStatus = BookingStatus.PENDING,
  ) { }
}

export class Book implements Action {
  readonly type = BOOK
  constructor(public booking: Booking) { }
}

export class Approve implements Action {
  readonly type = APPROVE
  constructor(public bookingId: string) { }
}

export class Reject implements Action {
  readonly type = REJECT
  constructor(public bookingId: string) { }
}

export class Checkout implements Action {
  readonly type = CHECKOUT
  constructor(public booking: Booking) { }
}

export class Added implements Action {
  readonly type = ADDED
  constructor(public payload: Booking) { }
}

export class Modified implements Action {
  readonly type = MODIFIED
  constructor(public payload: Booking) { }
}

export class Removed implements Action {
  readonly type = REMOVED
  constructor(public payload: Booking) { }
}

export class Success implements Action {
  readonly type = SUCCESS
  constructor(public bookingId?: string) { } // bookingId used by checkout ONLY to confirm if stuff was updated
}

export class Fail implements Action {
  readonly type = FAIL
  constructor(public error: any) { }
}

export type BookingActions
  = Query
  | Select
  | Filter
  | Book
  | Approve
  | Reject
  | Checkout
  | Added
  | Modified
  | Removed
  | Success
  | Fail
