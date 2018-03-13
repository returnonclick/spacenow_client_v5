import { createSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { Listing } from '@shared/models/listing';

import * as actions from '@core/store/listings/actions/listing';

export interface State extends EntityState<Listing> {
    loading: boolean
    selectedListingId: string | null
}

export const listingAdapter: EntityAdapter<Listing> = createEntityAdapter<Listing>({
    selectId: (obj: Listing) => obj.id,
    sortComparer: false,
});

export const initialState: State = listingAdapter.getInitialState({
    loading: true,
    selectedListingId: null
});



export function reducer(
    state = initialState,
    action: actions.ListingActions
): State {
    switch (action.type) {
        case actions.ADDED: {
            return listingAdapter.addOne(action.payload, {
                ...state,
                loading: false,
                selectedListingId: action.payload.id
            })
        }

        case actions.MODIFIED: {
            return { 
                ...state,
                loading: false,
                ...listingAdapter.updateOne({
                    id: action.payload.id,
                    changes: action.payload
                }, state)
            }
        }

        case actions.REMOVED: {
            return {
                ...state,
                loading: false,
                ...listingAdapter.removeOne(action.payload.id, state),
                selectedListingId: null
            }
        }

        default: {
            return state;
        }
    }
}
