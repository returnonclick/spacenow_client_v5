import { createSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { Amenity } from '@shared/models/amenity';
import * as actions from '@core/store/amenities/actions/amenity';

export interface State extends EntityState<Amenity> {
    loading: boolean;
}

export const amenityAdapter: EntityAdapter<Amenity> = createEntityAdapter<Amenity>({
    selectId: (obj: Amenity) => obj.id,
    sortComparer: false,
});

export const initialState: State = amenityAdapter.getInitialState({
    loading: false,
});

export function reducer(
    state = initialState,
    action: actions.AmenityActions
): State {
    switch (action.type) {

        case actions.ADDED: {
            return {
                ...state,
                loading: true,
                ...amenityAdapter.addOne(action.payload, state)
            };
        }

        case actions.MODIFIED: {
            return { 
                ...state,
                loading: true,
                ...amenityAdapter.updateOne({
                    id: action.payload.id,
                    changes: action.payload
                }, state)
            }
        }

        case actions.REMOVED: {
            return {
                ...state,
                loading: true,
                ...amenityAdapter.removeOne(action.payload.id, state)
            }
        }

        default: {
            return state;
        }
    }
}

export const getLoading = (state: State) => state.loading;
