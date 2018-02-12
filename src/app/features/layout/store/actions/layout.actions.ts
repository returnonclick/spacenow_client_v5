import { Action } from '@ngrx/store';

export const LOAD =                 '[Layout] Load';
export const LOAD_SUCCESS =         '[Layout] Load Success';
export const LOAD_FAIL =            '[Layout] Load Fail';

/**
 * Load Layout Actions
 */
export class LoadAction implements Action {
  readonly type = LOAD;
}

export class LoadSuccessAction implements Action {
  readonly type = LOAD_SUCCESS;

  constructor(public payload: any) { }
}

export class LoadFailAction implements Action {
  readonly type = LOAD_FAIL;

  constructor(public payload: any) { }
}

export type Actions =
  | LoadAction
  | LoadSuccessAction
  | LoadFailAction;