import { createSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { Profile } from '@shared/models/profile';
import * as actions from '@core/store/users-profile/actions/user-profile';

export interface State extends EntityState<Profile> {
    loading: boolean
    selectedId: string | null
}

export const userProfileAdapter: EntityAdapter<Profile> = createEntityAdapter<Profile>({
    selectId: (obj: Profile) => obj.uid,
    sortComparer: false
})

export const initialState: State = userProfileAdapter.getInitialState({
    loading: true,
    selectedId: null
});

export function reducer(
    state = initialState,
    action: actions.UserProfileActions
): State {
    switch (action.type) {

        case actions.ADDED: {
            return userProfileAdapter.addOne(action.payload, {
                ...state,
                selectedId: action.payload.uid,
                loading: false
            })
        }

        case actions.MODIFIED: {
            return userProfileAdapter.updateOne({
                id: action.payload.uid,
                changes: action.payload
            }, {
                ...state,
                selectedId: action.payload.uid,
                loading: false
            })
        }

        case actions.REMOVED: {
            return userProfileAdapter.removeOne(action.payload.uid, { 
                ...state,
                selectedId: action.payload.uid,
                loading: false
            })
        }

        default: {
            return state;
        }
    }
}
