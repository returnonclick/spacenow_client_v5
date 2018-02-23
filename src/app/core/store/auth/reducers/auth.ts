import { createSelector } from '@ngrx/store'
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity'
import { User } from '@shared/models/user'
import * as auth from '@core/store/auth/actions/auth'

export interface State extends EntityState<User> {
    isSignedIn: boolean
    user: User
    selectedId: string | null
}

export const authAdapter: EntityAdapter<User> = createEntityAdapter<User>({
    selectId: (obj: User) => obj.uid,
    sortComparer: false,
})

export const initialState: State = authAdapter.getInitialState({
    isSignedIn: false,
    user: null,
    selectedId: null
})

export function reducer(
    state = initialState,
    action: auth.Actions
): State {
    switch (action.type) {

        case auth.SUCCESS: {

            return authAdapter.addOne(action.payload, 
                { 
                    ...state, 
                    isSignedIn: true, 
                    user: action.payload,
                    selectedUserId: state.selectedId,
                })

        }

        case auth.SIGN_OUT: {
            return {
                ...authAdapter.removeAll(state),
            }
        }

        default: {
            return state
        }
    }
}

export const isSignedIn = (state: State) => state.isSignedIn
export const getAuthUser = (state: State) => state.user 
export const getSelectedId = (state: State) => state.selectedId;