import { Action } from '@ngrx/store'
import { Amenity } from '@shared/models/amenity'

export const QUERY      = '[Amenity] query'

export const ADDED      = '[Amenity] added'
export const MODIFIED   = '[Amenity] modified'
export const REMOVED    = '[Amenity] removed'

export const CREATE     = '[Amenity] create'
export const UPDATE     = '[Amenity] update'
export const DELETE     = '[Amenity] delete'
export const SUCCESS    = '[Amenity] success'
export const FAIL       = '[Amenity] fail'

export class Query implements Action {
    readonly type = QUERY
    constructor( ) { }
}

export class Added implements Action {
    readonly type = ADDED
    constructor( public payload: Amenity ) { }
}

export class Modified implements Action {
    readonly type = MODIFIED
    constructor( public payload: Amenity ) { }
}

export class Removed implements Action {
    readonly type = REMOVED
    constructor( public payload: Amenity ) { }
}

export class Create implements Action {
    readonly type = CREATE
    constructor( public payload: Amenity ) { }
}

export class Update implements Action {
    readonly type = UPDATE
    constructor( 
        public id: string, 
        public changes: Partial<Amenity> 
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

export type AmenityActions = 
    | Query
    | Added
    | Modified
    | Removed
    | Create
    | Update
    | Delete
    | Success
