import { Action } from '@ngrx/store';
import { User } from '@shared/models/user';
// tslint:disable:max-classes-per-file

export const GET_USER = '[Auth] Get User';
export const SIGN_IN = '[Auth] SignIn';
export const SIGN_UP = '[Auth] SignUp';
export const SIGN_IN_WITH_PROVIDER = '[Auth] SignIn with provider';
export const SIGN_OUT = '[Auth] SignOut';
export const SUCCESS = '[Auth] Sucess';
export const FAIL = '[Auth] Fail';

export class GetUser implements Action {
    public readonly type = GET_USER;

    constructor(public uid: string) {}
}

export class SignIn implements Action {
    public readonly type = SIGN_IN;

    constructor(public payload: {username: string, password: string}) {}
}

export class SignUp implements Action {
    public readonly type = SIGN_UP;

    constructor(public payload: {username: string, password: string}) {}
}

export class SignInWithProvider implements Action {
    public readonly type = SIGN_IN_WITH_PROVIDER;

    constructor(public payload: any) {}
}

export class SignOut implements Action {
    public readonly type = SIGN_OUT;
}

export class Success implements Action {
    public readonly type = SUCCESS;

    constructor(public payload: any) {}
}

export class Fail implements Action {
    public readonly type = FAIL;

    constructor(public payload: any) {}
}

export type Actions = 
    | GetUser
    | SignIn
    | SignInWithProvider
    | Success
    | Fail
    | SignOut;
