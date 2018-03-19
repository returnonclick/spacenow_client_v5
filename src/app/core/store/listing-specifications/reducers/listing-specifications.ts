import { createSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { ListingSpecification } from '@shared/models/listing-specification';
import * as actions from '@core/store/listing-specifications/actions/listing-specification';

export interface State extends EntityState<ListingSpecification> {
    loading: boolean;
}

export const listingSpecificationAdapter: EntityAdapter<ListingSpecification> = createEntityAdapter<ListingSpecification>({
    selectId: (obj: ListingSpecification) => obj.id,
    sortComparer: false,
});

export const initialState: State = listingSpecificationAdapter.getInitialState({
    loading: false,
});

export function reducer(
    state = initialState,
    action: actions.ListingSpecificationActions
): State {
    switch (action.type) {

        case actions.ADDED: {
            return {
                ...state,
                loading: true,
                ...listingSpecificationAdapter.addOne(action.payload, state)
            };
        }

        case actions.MODIFIED: {
            return { 
                ...state,
                loading: true,
                ...listingSpecificationAdapter.updateOne({
                    id: action.payload.id,
                    changes: action.payload
                }, state)
            }
        }

        case actions.REMOVED: {
            return {
                ...state,
                loading: true,
                ...listingSpecificationAdapter.removeOne(action.payload.id, state)
            }
        }

        default: {
            return state;
        }
    }
}

export const getLoading = (state: State) => state.loading;
