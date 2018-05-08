import { createSelector } from '@ngrx/store'
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity'

import { Space } from '@shared/models/space'
import * as actions from '@core/store/search/actions/search'

export interface State extends EntityState<Space> {
  isLoading: boolean
}

export const searchAdapter: EntityAdapter<Space> = createEntityAdapter<Space>({
  selectId: (obj: Space) => obj.id,
  sortComparer: false
})

export const initialState: State = searchAdapter.getInitialState({
  isLoading: false
})

export function reducer(
  state = initialState,
  action: actions.SearchActions
): State {
  switch(action.type) {

    case actions.QUERY: {
      return searchAdapter.removeAll({
        ...state,
        isLoading: true,
      })
    }

    case actions.DONE: {
      return searchAdapter.addMany(action.payload, {
        ...state,
        isLoading: false,
      })
    }

    case actions.ERROR: {
      return searchAdapter.removeAll({
        ...state,
        isLoading: false,
      })
    }

    case actions.ADDED: {
      return searchAdapter.addOne(action.payload, {
        ...state,
        isLoading: false,
      })
    }

    case actions.MODIFIED: {
      return searchAdapter.updateOne({
        id:      action.payload.id,
        changes: action.payload,
      }, {
        ...state,
        isLoading: false,
      })
    }

    case actions.REMOVED: {
      return searchAdapter.removeOne(action.payload.id, {
        ...state,
        isLoading: false,
      })
    }

    default: {
      return state
    }

  }
}

export const isLoading = (state: State) => state.isLoading
