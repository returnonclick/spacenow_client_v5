import { Action } from '@ngrx/store'

import { Space } from '@shared/models/space'

export const SELECT   = '[Spaces] select'

export const SUCCESS  = '[Spaces] success'
export const FAIL     = '[Spaces] fail'

export class Select implements Action {
  readonly type = SELECT
  constructor(public id: string) { }
}

export class Success implements Action {
  readonly type = SUCCESS
  constructor(public space: Space) { }
}

export class Fail implements Action {
  readonly type = FAIL
  constructor(public error: any) { }
}

export type SpaceActions
  = Select
  | Success
  | Fail
