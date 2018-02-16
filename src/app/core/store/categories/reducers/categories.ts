import { createSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { Category } from '@shared/models/category';
import * as actions from '@core/store/categories/actions/category';

export interface State extends EntityState<Category> {
    loading: boolean;
}

export const categoryAdapter: EntityAdapter<Category> = createEntityAdapter<Category>({
    selectId: (obj: Category) => obj.id,
    sortComparer: false,
});

export const initialState: State = categoryAdapter.getInitialState({
    loading: false,
});

export function reducer(
    state = initialState,
    action: actions.CategoryActions
): State {
    switch (action.type) {

        case actions.ADDED: {
            return {
                ...state,
                loading: true,
                ...categoryAdapter.addOne(action.payload, state)
            };
        }

        case actions.MODIFIED: {
            return { 
                ...state,
                loading: true,
                ...categoryAdapter.updateOne({
                    id: action.payload.id,
                    changes: action.payload
                }, state)
            }
        }

        case actions.REMOVED: {
            return {
                ...state,
                loading: true,
                ...categoryAdapter.removeOne(action.payload.id, state)
            }
        }

        default: {
            return state;
        }
    }
}

export const getLoading = (state: State) => state.loading;
