import { Action } from '@ngrx/store'
import { ListingShortDetail } from '@shared/models/listing-short-detail'

export const QUERY      = '[Listings Short Detail] query'
export const ADDED      = '[Listings Short Detail] added'

export const SUCCESS    = '[Listings Short Detail] success'
export const FAIL       = '[Listings Short Detail] fail'

export class Query implements Action {
    readonly type = QUERY
    constructor( ) { }
}

export class Added implements Action {
    readonly type = ADDED
    constructor( public payload: ListingShortDetail[] ) { }
}

export class Success implements Action {
    readonly type = SUCCESS
    constructor( ) { }
}

export class Fail implements Action {
    readonly type = FAIL
    constructor( public payload: any ) { }
}

export type ListingShortDetailActions = 
    | Query
    | Added
    | Success
    | Fail

