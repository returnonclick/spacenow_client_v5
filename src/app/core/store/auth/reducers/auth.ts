import { createSelector } from '@ngrx/store'
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity'
import { User } from '@shared/models/user'
import * as auth from '@core/store/auth/actions/auth'

export interface State {
    isSignedIn: boolean | false
    user: User | null
    error: string | null
}

const initialState: State = {
    isSignedIn: false,
    user: null,
    error: null
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
                user: action.payload.user,
                isSignedIn: true
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
