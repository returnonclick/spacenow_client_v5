import { Action } from '@ngrx/store'
import { ListingSpecification } from '@shared/models/listing-specification'

export const QUERY      = '[ListingSpecification] query'

export const ADDED      = '[ListingSpecification] added'
export const MODIFIED   = '[ListingSpecification] modified'
export const REMOVED    = '[ListingSpecification] removed'

export const CREATE     = '[ListingSpecification] create'
export const UPDATE     = '[ListingSpecification] update'
export const DELETE     = '[ListingSpecification] delete'
export const SUCCESS    = '[ListingSpecification] success'
export const FAIL       = '[ListingSpecification] fail'

export class Query implements Action {
    readonly type = QUERY
    constructor( ) { }
}

export class Added implements Action {
    readonly type = ADDED
    constructor( public payload: ListingSpecification ) { }
}

export class Modified implements Action {
    readonly type = MODIFIED
    constructor( public payload: ListingSpecification ) { }
}

export class Removed implements Action {
    readonly type = REMOVED
    constructor( public payload: ListingSpecification ) { }
}

export class Create implements Action {
    readonly type = CREATE
    constructor( public payload: ListingSpecification ) { }
}

export class Update implements Action {
    readonly type = UPDATE
    constructor( 
        public id: string, 
        public changes: Partial<ListingSpecification> 
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

export type ListingSpecificationActions = 
    | Query
    | Added
    | Modified
    | Removed
    | Create
    | Update
    | Delete
    | Success
