import { Action } from '@ngrx/store'
import { Category } from '@shared/models/category'

export const QUERY      = '[Category] query'

export const ADDED      = '[Category] added'
export const MODIFIED   = '[Category] modified'
export const REMOVED    = '[Category] removed'

export const CREATE     = '[Category] create'
export const UPDATE     = '[Category] update'
export const DELETE     = '[Category] delete'
export const SUCCESS    = '[Category] success'
export const FAIL       = '[Category] fail'

export class Query implements Action {
    readonly type = QUERY
    constructor( ) { }
}

export class Added implements Action {
    readonly type = ADDED
    constructor( public payload: Category ) { }
}

export class Modified implements Action {
    readonly type = MODIFIED
    constructor( public payload: Category ) { }
}

export class Removed implements Action {
    readonly type = REMOVED
    constructor( public payload: Category ) { }
}

export class Create implements Action {
    readonly type = CREATE
    constructor( public payload: Category ) { }
}

export class Update implements Action {
    readonly type = UPDATE
    constructor( 
        public id: string, 
        public changes: Partial<Category> 
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

export type CategoryActions = 
    | Query
    | Added
    | Modified
    | Removed
    | Create
    | Update
    | Delete
    | Success
