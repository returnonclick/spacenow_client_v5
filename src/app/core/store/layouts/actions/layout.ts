import { Action } from '@ngrx/store'

export enum LayoutActionTypes {
  OpenSidenav = '[Layout] Open Sidenav',
  CloseSidenav = '[Layout] Close Sidenav',
  SetLogoWhite = '[Layout] Set Logo White',
  SetLogoGreen = '[Layout] Set Logo Green'
}

export class OpenSidenav implements Action {
  readonly type = LayoutActionTypes.OpenSidenav
}

export class CloseSidenav implements Action {
  readonly type = LayoutActionTypes.CloseSidenav
}

export class SetLogoWhite implements Action {
  readonly type = LayoutActionTypes.SetLogoWhite
}

export class SetLogoGreen implements Action {
  readonly type = LayoutActionTypes.SetLogoGreen
}

export type LayoutActions = OpenSidenav | CloseSidenav | SetLogoWhite | SetLogoGreen