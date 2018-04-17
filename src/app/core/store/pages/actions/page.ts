import { Action } from '@ngrx/store'
import { Page } from '@shared/models/page'

export const QUERY      = '[Page] query'

export const ADDED      = '[Page] added'
export const MODIFIED   = '[Page] modified'
export const REMOVED    = '[Page] removed'

export const CREATE     = '[Page] create'
export const UPDATE     = '[Page] update'
export const DELETE     = '[Page] delete'
export const SUCCESS    = '[Page] success'
export const FAIL       = '[Page] fail'

export class Query implements Action {
    readonly type = QUERY
    constructor( ) { }
}

export class Added implements Action {
    readonly type = ADDED
    constructor( public payload: Page ) { }
}

export class Modified implements Action {
    readonly type = MODIFIED
    constructor( public payload: Page ) { }
}

export class Removed implements Action {
    readonly type = REMOVED
    constructor( public payload: Page ) { }
}

export class Create implements Action {
    readonly type = CREATE
    constructor( public payload: Page ) { }
}

export class Update implements Action {
    readonly type = UPDATE
    constructor( 
        public id: string, 
        public changes: Partial<Page> 
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

export class Fail implements Action {
    readonly type = FAIL
    constructor( public payload: any ) { }
}

export type PageActions = 
    | Query
    | Added
    | Modified
    | Removed
    | Create
    | Update
    | Delete
    | Success
