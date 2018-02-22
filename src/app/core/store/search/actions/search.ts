import { Action } from '@ngrx/store'

import { Space } from '@shared/models/space'

export const QUERY = '[Search] query'
export const DONE  = '[Search] done'
export const ERROR = '[Search] error'

export class Query implements Action {
  readonly type = QUERY
  constructor(public params: any) { }
}

export class Done implements Action {
  readonly type = DONE
  constructor(public payload: Space[]) { }
}

export class Error implements Action {
  readonly type = ERROR
  constructor(public error: any) { }
}

export type SearchActions
  = Query
  | Done
  | Error
