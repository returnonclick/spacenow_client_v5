import { User } from '@shared/models/user'
import * as auth from '@core/store/auth/actions/auth'

export interface State {
  isSignedIn: boolean
  user:       User
  error:      any
}

const initialState: State = {
  isSignedIn: false,
  user:       null,
  error:      null
}

export function reducer(
  state = initialState,
  action: auth.Actions
): State {
  switch (action.type) {

    case auth.FAIL: {
      return {
        ...state,
        error: action.payload
      }
    }

    case auth.SUCCESS: {
      return {
        ...state,
        user:       action.payload ? action.payload.user : state.user,
        isSignedIn: action.payload ? !!action.payload.user : state.isSignedIn,
      }
    }

    case auth.SIGN_OUT: {
      return initialState
    }

    default: {
      return state
    }

  }
}
