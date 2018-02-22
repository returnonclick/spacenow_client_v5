import { createSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { Listing } from '@shared/models/listing';
import * as actions from '@core/store/listings/actions/listing';

export interface State extends EntityState<Listing> {
    loading: boolean;
    selectedListingId: string | null;
}

export const listingAdapter: EntityAdapter<Listing> = createEntityAdapter<Listing>({
    selectId: (obj: Listing) => obj.id,
    sortComparer: false,
});

export const initialState: State = listingAdapter.getInitialState({
    loading: false,
    selectedListingId: null
});

export function reducer(
    state = initialState,
    action: actions.ListingActions
): State {
    switch (action.type) {

        case actions.ADDED: {
            return {
                ...state,
                loading: true,
                ...listingAdapter.addOne(action.payload, state)
            };
        }

        case actions.MODIFIED: {
            return { 
                ...state,
                loading: true,
                ...listingAdapter.updateOne({
                    id: action.payload.id,
                    changes: action.payload
                }, state)
            }
        }

        case actions.REMOVED: {
            return {
                ...state,
                loading: true,
                ...listingAdapter.removeOne(action.payload.id, state)
            }
        }

        default: {
            return state;
        }
    }
}

export const getLoading = (state: State) => state.loading;
export const getSelectedListingId = (state: State) => state.selectedListingId;
