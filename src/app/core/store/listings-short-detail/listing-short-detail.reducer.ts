import { createSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { ListingShortDetail } from '@shared/models/listing-short-detail';

import * as actions from './listing-short-detail.action';

export interface State extends EntityState<ListingShortDetail> {
    loading: boolean
}

export const listingShortDetailAdapter: EntityAdapter<ListingShortDetail> = createEntityAdapter<ListingShortDetail>({
    selectId: (obj: ListingShortDetail) => obj.id,
    sortComparer: false
});

export const initialState: State = listingShortDetailAdapter.getInitialState({
    loading: true
});

export function reducer(
    state = initialState,
    action: actions.ListingShortDetailActions
): State {
    switch (action.type) {

        case actions.ADDED: {
            return listingShortDetailAdapter.addAll(action.payload, {
                ...state,
                loading: false
            })
        }

        default: {
            return state;
        }
    }
}
