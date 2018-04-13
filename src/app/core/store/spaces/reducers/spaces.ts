import { createSelector } from '@ngrx/store'
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity'

import { Space } from '@models/space'
import { ListingShortDetail } from '@models/listing-short-detail'

import * as actions from '@core/store/spaces/actions/space'

export interface State extends EntityState<Space|ListingShortDetail> {
  isLoading: boolean,
  error:     any,
}

export const spaceAdapter: EntityAdapter<Space|ListingShortDetail> = createEntityAdapter<Space|ListingShortDetail>({
  selectId:     (obj: Space|ListingShortDetail) => obj.id,
  sortComparer: false
})

export const initialState: State = spaceAdapter.getInitialState({
  isLoading: false,
  error:     null,
})

export function reducer(
  state = initialState,
  action: actions.SpaceActions
): State {
  switch(action.type) {

    case actions.ALL:
    case actions.FILTER:
    case actions.SELECT: {
      return spaceAdapter.removeAll({
        ...state,
        isLoading: true,
        error:     null,
      })
    }

    case actions.ADD_MANY: {
      return spaceAdapter.addMany(action.payload, state)
    }

    case actions.ADDED: {
      return spaceAdapter.addOne(action.payload, state)
    }

    case actions.MODIFIED: {
      return spaceAdapter.updateOne({
        id:      action.payload.id,
        changes: action.payload,
      }, state)
    }

    case actions.REMOVED: {
      return spaceAdapter.removeOne(action.payload.id, state)
    }

    case actions.SUCCESS: {
      return {
        ...state,
        isLoading: false,
      }
    }

    case actions.FAIL: {
      return spaceAdapter.removeAll({
        ...state,
        isLoading: false,
        error:     action.error,
      })
    }

    default: {
      return state
    }

  }
}

export const isLoading = (state: State) => state.isLoading
export const getError  = (state: State) => state.error
