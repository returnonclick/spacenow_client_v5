import { createSelector } from '@ngrx/store'

import * as actions from '@core/store/checkout/actions/checkout'

export interface State {
  isLoading: boolean
  bookingId: string
  error:     any
}

export const initialState: State = {
  isLoading: false,
  bookingId: null,
  error:     null,
}

export function reducer(
  state = initialState,
  action: actions.CheckoutActions
): State {
  switch(action.type) {

    case actions.CHECKOUT: {
      return {
        ...state,
        isLoading: true,
        bookingId: null,
        error:     null,
      }
    }

    case actions.CHECKOUT_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        bookingId: action.bookingId,
      }
    }

    case actions.CHECKOUT_FAIL: {
      return {
        ...state,
        isLoading: false,
        error:     action.error,
      }
    }

    default: {
      return state
    }

  }
}

export const getIsLoading = (state: State) => state.isLoading
export const getBookingId = (state: State) => state.bookingId
export const getError     = (state: State) => state.error
