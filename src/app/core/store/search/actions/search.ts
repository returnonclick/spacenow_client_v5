import { Action } from '@ngrx/store'

import { ListingShortDetail } from '@shared/models/listing-short-detail'

export const QUERY = '[Search] query'
export const DONE  = '[Search] done'
export const ERROR = '[Search] error'

export const ADDED    = '[Search] added'
export const MODIFIED = '[Search] modified'
export const REMOVED  = '[Search] removed'

export class Query implements Action {
  readonly type = QUERY
  constructor(public params: any) { }
}

export class Done implements Action {
  readonly type = DONE
  constructor(public payload: ListingShortDetail[]) { }
}

export class Error implements Action {
  readonly type = ERROR
  constructor(public error: any) { }
}

export class Added implements Action {
  readonly type = ADDED
  constructor(public payload: ListingShortDetail) { }
}

export class Modified implements Action {
  readonly type = MODIFIED
  constructor(public payload: ListingShortDetail) { }
}

export class Removed implements Action {
  readonly type = REMOVED
  constructor(public payload: ListingShortDetail) { }
}

export type SearchActions
  = Query
  | Done
  | Error
  | Added
  | Modified
  | Removed