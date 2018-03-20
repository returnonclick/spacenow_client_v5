import { LayoutActionTypes, LayoutActions } from '../actions/layout'

export interface State {
  showSidenav: boolean
  logo: string
  showFooter: boolean
  sidenavComponent: string
}

const initialState: State = {
  showSidenav: false,
  logo: 'logo-white',
  showFooter: true,
  sidenavComponent: 'sign-in'
}

export function reducer(
  state: State = initialState,
  action: LayoutActions
): State {
  switch (action.type) {
    case LayoutActionTypes.CloseSidenav:
      return {
        ...state,
        showSidenav: false,
      }

    case LayoutActionTypes.OpenSidenav:
      return {
        ...state,
        showSidenav: true,
      }

    case LayoutActionTypes.SetLogoGreen:
      return {
        ...state,
        logo: 'logo-green'
      }

    case LayoutActionTypes.SetLogoWhite:
      return {
        ...state,
        logo: 'logo-white'
      }

    case LayoutActionTypes.SetSidenavLogin:
      return {
        ...state,
        sidenavComponent: 'sign-in'
      }
    
    case LayoutActionTypes.SetSidenavRegister:
      return {
        ...state,
        sidenavComponent: 'register'
      }
    
    case LayoutActionTypes.SetSidenavForgotPassword:
      return {
        ...state,
        sidenavComponent: 'forgot-password'
      } 

    default:
      return state
  }
}
