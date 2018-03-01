import { createSelector } from '@ngrx/store'
import { EntityState,  EntityAdapter, createEntityAdapter } from '@ngrx/entity'

import { BookingSpace } from '@models/booking'

import * as actions from '@core/store/cart/actions/cart'

export interface State extends EntityState<BookingSpace> {
  error: any
}

export const cartAdapter: EntityAdapter<BookingSpace> = createEntityAdapter<BookingSpace>({
  selectId: (obj: BookingSpace) => obj.spaceId,
  sortComparer: false
})

export const initialState: State = cartAdapter.getInitialState({
  error: null
})

export function reducer(
  state = initialState,
  action: actions.CartActions
): State {
  switch(action.type) {

    case actions.ADD: {
      return cartAdapter.addOne(action.item, state)
    }

    case actions.REMOVE: {
      return cartAdapter.removeOne(action.id, state)
    }

    case actions.CLEAR: {
      return cartAdapter.removeAll(state)
    }

    default: {
      return state
    }

  }
}

export const getError = (state: State) => state.error
