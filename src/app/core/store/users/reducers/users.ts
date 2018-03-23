import { createSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { User } from '@shared/models/user';
import * as actions from '@core/store/users/actions/user';

export interface State extends EntityState<User> {
    loading: boolean
    selectedUserId: string | null
}

export const userAdapter: EntityAdapter<User> = createEntityAdapter<User>({
    selectId: (obj: User) => obj.uid,
    sortComparer: false,
})

export const initialState: State = userAdapter.getInitialState({
    loading: false,
    selectedUserId: null
});

export function reducer(
    state = initialState,
    action: actions.UserActions
): State {
    switch (action.type) {

        case actions.ADDED: {
            return userAdapter.addOne(action.payload, {
                ...state,
                selectedUserId: state.selectedUserId,
                loading: false
            })
        }

        case actions.MODIFIED: {
            return userAdapter.updateOne({
                id: action.payload.uid,
                changes: action.payload
            }, {
                ...state,
                selectedUserId: state.selectedUserId,
                loading: false
            })
        }

        case actions.REMOVED: {
            return userAdapter.removeOne(action.payload.uid, {
                ...state,
                selectedUserId: state.selectedUserId,
                loading: false
            })
        }

        default: {
            return state;
        }
    }
}

export const getLoading = (state: State) => state.loading;
export const getSelectedId = (state: State) => state.selectedUserId;
