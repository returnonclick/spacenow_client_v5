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

        case auth.ADDED: {
            return authAdapter.addOne(action.payload, {
                ...state,
                isSignedIn: true,
                selectedId: action.payload.uid
            })
        }

        case auth.MODIFIED: {
            return authAdapter.updateOne({
                id: action.payload.uid,
                changes: action.payload
            }, {
                ...state,
                isSignedIn: true,
                selectedUserId: action.payload.uid,
            })
        }

        case auth.REMOVED: {
            return authAdapter.removeOne(action.payload.uid, { 
                ...state,
                isSignedIn: true,
                selectedUserId: action.payload.uid,
            })
        }

        // case auth.SUCCESS: {

        //     return authAdapter.addOne(action.payload, 
        //         { 
        //             ...state,
        //             isSignedIn: true,
        //             selectedId: action.payload.uid
        //         })

        // }

        case auth.SIGN_OUT: {
            return authAdapter.removeAll(
                {
                    ...state,
                    isSignedIn: false,
                    selectedId: null
            })
        }

        default: {
            return state
        }
    }
}
