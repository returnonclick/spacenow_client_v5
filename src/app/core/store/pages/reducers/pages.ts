import { createSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { Page } from '@shared/models/page';
import * as actions from '@core/store/pages/actions/page';

export interface State extends EntityState<Page> {
    loading: boolean;
}

export const pageAdapter: EntityAdapter<Page> = createEntityAdapter<Page>({
    selectId: (obj: Page) => obj.id,
    sortComparer: false,
});

export const initialState: State = pageAdapter.getInitialState({
    loading: false,
});

export function reducer(
    state = initialState,
    action: actions.PageActions
): State {
    switch (action.type) {

        case actions.ADDED: {
            return pageAdapter.addOne(action.payload, {
                ...state,
                loading: true
            })
        }

        case actions.MODIFIED: {
            return { 
                ...state,
                loading: true,
                ...pageAdapter.updateOne({
                    id: action.payload.id,
                    changes: action.payload
                }, state)
            }
        }

        case actions.REMOVED: {
            return {
                ...state,
                loading: true,
                ...pageAdapter.removeOne(action.payload.id, state)
            }
        }

        default: {
            return state;
        }
    }
}


export const getLoading = (state: State) => state.loading;
