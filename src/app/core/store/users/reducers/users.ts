import { createSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { User } from '@shared/models/user';
import * as actions from '@core/store/users/actions/user';

export interface State extends EntityState<User> {
    loading: boolean;
}

export const userAdapter: EntityAdapter<User> = createEntityAdapter<User>({
    selectId: (obj: User) => obj.userUID,
    sortComparer: false,
})

export const initialState: State = userAdapter.getInitialState({
    loading: false
});

export function reducer(
    state = initialState,
    action: actions.UserActions
): State {
    switch (action.type) {

        case actions.ADDED: {
            return {
                ...state,
                loading: true,
                ...userAdapter.addOne(action.payload, state)
            }
        }

        case actions.MODIFIED: {
            return { 
                ...state,
                loading: true,
                ...userAdapter.updateOne({
                    id: action.payload.userUID,
                    changes: action.payload
                }, state)
            }
        }

        case actions.REMOVED: {
            return {
                ...state,
                loading: true,
                ...userAdapter.removeOne(action.payload.userUID, state)
            }
        }

        default: {
            return state;
        }
    }
}

export const getLoading = (state: State) => state.loading;
