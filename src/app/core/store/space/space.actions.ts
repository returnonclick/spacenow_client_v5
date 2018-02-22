import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Space } from '@models/space';

export enum SpaceActionTypes {
  LoadSpaces = '[Space] Load Spaces',
  LoadSpace = '[Space] Load Space',
  LoadSpacesSuccess = '[Space] Load Spaces Success',
  LoadSpaceSuccess = '[Space] Load Space Success',
}

export class LoadSpaces implements Action {
  readonly type = SpaceActionTypes.LoadSpaces;

  constructor() {}
}

export class LoadSpace implements Action {
  readonly type = SpaceActionTypes.LoadSpace

  constructor(public payload: { spaceID: string }){}
}

export class LoadSpacesSuccess implements Action {
  readonly type = SpaceActionTypes.LoadSpacesSuccess;

  constructor(public payload: { spaces: Space[] }) {}
}

export class LoadSpaceSuccess implements Action {
  readonly type = SpaceActionTypes.LoadSpaceSuccess;

  constructor(public payload: { space: Space }) {}
}

export type SpaceActions =
 LoadSpaces
 | LoadSpace
 | LoadSpacesSuccess
 | LoadSpaceSuccess

