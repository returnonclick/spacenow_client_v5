import { Action } from '@ngrx/store'
import { Profile } from '@shared/models/profile'

export const QUERY               = '[Profile] query'

export const ADDED               = '[Profile] added'
export const MODIFIED            = '[Profile] modified'
export const REMOVED             = '[Profile] removed'

export const UPDATE              = '[Profile] update'
export const SUCCESS             = '[Profile] success'
export const FAIL                = '[Profile] fail'

export class Query implements Action {
    readonly type = QUERY
    constructor( public uid: string ) { }
}

export class Added implements Action {
    readonly type = ADDED
    constructor( public payload: Profile ) { }
}

export class Modified implements Action {
    readonly type = MODIFIED
    constructor( public payload: Profile ) { }
}

export class Removed implements Action {
    readonly type = REMOVED
    constructor( public payload: Profile ) { }
}

export class Update implements Action {
    readonly type = UPDATE
    constructor( 
        public id: string, 
        public changes: Partial<Profile> 
    ) { }
}

export class Success implements Action {
    readonly type = SUCCESS
    constructor( ) { }
}

export class Fail implements Action {
    readonly type = FAIL
    constructor( public payload: any ) { }
}
    
export type UserProfileActions = 
    | Query
    | Added
    | Modified
    | Removed
    | Update
    | Success
