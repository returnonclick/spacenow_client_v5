import { Action } from '@ngrx/store';
import { User } from '@shared/models/user';
// tslint:disable:max-classes-per-file

export const ADDED                  = '[Auth] added'
export const MODIFIED               = '[Auth] modified'
export const REMOVED                = '[Auth] removed'

export const GET_USER               = '[Auth] Get User';
export const SIGN_IN                = '[Auth] SignIn';
export const SIGN_UP                = '[Auth] SignUp';
export const SIGN_IN_WITH_PROVIDER  = '[Auth] SignIn with provider';
export const FORGOT_PASSWORD        = '[Auth] Forgot Password';
export const SIGN_OUT               = '[Auth] SignOut';
export const SUCCESS                = '[Auth] Sucess';
export const FAIL                   = '[Auth] Fail';

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

export class GetUser implements Action {
    readonly type = GET_USER;

    constructor(public uid: any) {}
}

export class SignIn implements Action {
    readonly type = SIGN_IN;

    constructor(public payload: {username: string, password: string}) {}
}

export class SignUp implements Action {
    readonly type = SIGN_UP;

    constructor(public payload: {username: string, password: string}) {}
}

export class SignInWithProvider implements Action {
    readonly type = SIGN_IN_WITH_PROVIDER;

    constructor(public payload: any) {}
}

export class SignOut implements Action {
    readonly type = SIGN_OUT;
}

export class ForgotPassword implements Action {
    readonly type = FORGOT_PASSWORD;

    constructor(public payload: {email: string}) {}
}

export class Success implements Action {
    readonly type = SUCCESS;

    constructor(public payload?: any) {}
}

export class Fail implements Action {
    readonly type = FAIL;

    constructor(public payload: any) {}
}

export type Actions = 
    | Added
    | Modified
    | Removed
    | GetUser
    | SignIn
    | SignInWithProvider
    | Success
    | Fail
    | SignOut
    | ForgotPassword;
