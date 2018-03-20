import { Action } from '@ngrx/store'

export enum LayoutActionTypes {
  OpenSidenav = '[Layout] Open Sidenav',
  CloseSidenav = '[Layout] Close Sidenav',
  SetLogoWhite = '[Layout] Set Logo White',
  SetLogoGreen = '[Layout] Set Logo Green',
  SetSidenavLogin = '[Layout] Set Sidenav Component Login',
  SetSidenavRegister = '[Layout] Set Sidenav Component Register',
  SetSidenavForgotPassword = '[Layout] Set Sidenav Component Forgot Password'
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

export class SetSidenavLogin implements Action {
  readonly type = LayoutActionTypes.SetSidenavLogin
}

export class SetSidenavRegister implements Action {
  readonly type = LayoutActionTypes.SetSidenavRegister
}

export class SetSidenavForgotPassword implements Action {
  readonly type = LayoutActionTypes.SetSidenavForgotPassword
}

export type LayoutActions = OpenSidenav | CloseSidenav | SetLogoWhite | SetLogoGreen | SetSidenavLogin | SetSidenavRegister | SetSidenavForgotPassword