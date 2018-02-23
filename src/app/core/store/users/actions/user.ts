import { Action } from '@ngrx/store'
import { User } from '@shared/models/user'

export const QUERY               = '[User] query'
export const QUERY_ONE           = '[User] query one'

export const ADDED               = '[User] added'
export const MODIFIED            = '[User] modified'
export const REMOVED             = '[User] removed'

export const CREATE              = '[User] create'
export const UPDATE              = '[User] update'
export const DELETE              = '[User] delete'
export const SUCCESS             = '[User] success'
export const FAIL                = '[User] fail'

export const READ_ROLE_BY_USER   = '[User] read roleByUser'

export class Query implements Action {
    readonly type = QUERY
    constructor( ) { }
}

export class QueryOne implements Action {
    readonly type = QUERY_ONE
    constructor( public uid: string ) { }
}

export class Added implements Action {
    readonly type = ADDED
    constructor( public payload: User ) { }
}

export class Modified implements Action {
    readonly type = MODIFIED
    constructor( public payload: User ) { }
}

export class Removed implements Action {
    readonly type = REMOVED
    constructor( public payload: User ) { }
}

export class Create implements Action {
    readonly type = CREATE
    constructor( public payload: User ) { }
}

export class Update implements Action {
    readonly type = UPDATE
    constructor( 
        public id: string, 
        public changes: Partial<User> 
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

export class ReadRoleByUser implements Action {
    readonly type = READ_ROLE_BY_USER
    constructor( public role: Array<string>  ) { }
}
    
export type UserActions = 
    | Query
    | QueryOne
    | Added
    | Modified
    | Removed
    | Create
    | Update
    | Delete
    | Success
    | ReadRoleByUser
