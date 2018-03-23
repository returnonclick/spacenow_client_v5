import { Action } from '@ngrx/store'

import { ListingShortDetail } from '@shared/models/listing-short-detail'

export const QUERY = '[Search] query'
export const DONE  = '[Search] done'
export const ERROR = '[Search] error'

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

export type SearchActions
  = Query
  | Done
  | Error
