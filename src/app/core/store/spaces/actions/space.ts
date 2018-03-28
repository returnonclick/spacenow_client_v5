import { Action } from '@ngrx/store'

import { Space } from '@models/space'
import { ListingShortDetail } from '@models/listing-short-detail'

export const ALL      = '[Spaces] all'
export const SELECT   = '[Spaces] select'
export const FILTER   = '[Spaces] filter'

export const ADDED    = '[Spaces] added'
export const MODIFIED = '[Spaces] modified'
export const REMOVED  = '[Spaces] removed'

export const SUCCESS  = '[Spaces] success'
export const FAIL     = '[Spaces] fail'

export class All implements Action {
  readonly type = ALL
  constructor() { }
}

export class Select implements Action {
  readonly type = SELECT
  constructor(
    public ids:     string[],
    public isShort: boolean = false
  ) { }
}

export class Filter implements Action {
  readonly type = FILTER
  constructor(
    public params: any[],
    public isShort: boolean = false
  ) { }
}

export class Added implements Action {
  readonly type = ADDED
  constructor(public payload: Space | ListingShortDetail) { }
}

export class Modified implements Action {
  readonly type = MODIFIED
  constructor(public payload: Space | ListingShortDetail) { }
}

export class Removed implements Action {
  readonly type = REMOVED
  constructor(public payload: Space | ListingShortDetail) { }
}

export class Success implements Action {
  readonly type = SUCCESS
  constructor() { }
}

export class Fail implements Action {
  readonly type = FAIL
  constructor(public error: any) { }
}

export type SpaceActions
  = All
  | Select
  | Filter
  | Added
  | Modified
  | Removed
  | Success
  | Fail
