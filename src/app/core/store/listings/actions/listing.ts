import { Action } from '@ngrx/store'
import { Space } from '@shared/models/space'

export const QUERY      = '[Listing] query'
export const QUERY_ONE  = '[Listing] query one'

export const ADDED      = '[Listing] added'
export const MODIFIED   = '[Listing] modified'
export const REMOVED    = '[Listing] removed'

export const CREATE     = '[Listing] create'
export const UPDATE     = '[Listing] update'
export const DELETE     = '[Listing] delete'
export const SUCCESS    = '[Listing] success'
export const CREATE_SUCCESS    = '[Listing] create success'
export const FAIL       = '[Listing] fail'

export const SELECT_LISTING = '[Listing] select-listing'

export class Query implements Action {
    readonly type = QUERY
    constructor( ) { }
}

export class QueryOne implements Action {
    readonly type = QUERY_ONE
    constructor(public id: string ) { }
}

export class Added implements Action {
    readonly type = ADDED
    constructor( public payload: Space ) { }
}

export class Modified implements Action {
    readonly type = MODIFIED
    constructor( public payload: Space ) { }
}

export class Removed implements Action {
    readonly type = REMOVED
    constructor( public payload: Space ) { }
}

export class Create implements Action {
    readonly type = CREATE
    constructor( public payload: Space ) { }
}

export class Update implements Action {
    readonly type = UPDATE
    constructor( 
        public id: string, 
        public changes: Partial<Space> 
    ) { }
}

export class Delete implements Action {
    readonly type = DELETE
    constructor( public id: string ) { }
}

export class Success implements Action {
    readonly type = SUCCESS
    constructor( ) { }
}

export class CreateSuccess implements Action {
    readonly type = CREATE_SUCCESS
    constructor(public listingId ) { }
}

export class Fail implements Action {
    readonly type = FAIL
    constructor( public payload: any ) { }
}

export class SelectListing implements Action {
  readonly type = SELECT_LISTING
  constructor(public payload: { listingId: string }) {}
}

export type ListingActions = 
    | Query
    | QueryOne
    | Added
    | Modified
    | Removed
    | Create
    | Update
    | Delete
    | Success
    | CreateSuccess
    | SelectListing

