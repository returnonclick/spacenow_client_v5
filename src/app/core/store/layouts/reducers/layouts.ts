import { LayoutActionTypes, LayoutActions } from '../actions/layout'

export interface State {
  showSidenav: boolean
  logo: string
}

const initialState: State = {
  showSidenav: false,
  logo: 'logo-white'
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
        

    default:
      return state
  }
}
