import { EntityState,  EntityAdapter, createEntityAdapter } from '@ngrx/entity'

import { Booking } from '@models/booking'

import * as actions from '@core/store/bookings/actions/booking'

export interface State extends EntityState<Booking> {
  bookingId: string, // used by checkout ONLY to confirm if booking was updated
  isLoading: boolean,
  error:     any,
}

export const bookingAdapter: EntityAdapter<Booking> = createEntityAdapter<Booking>({
  selectId: (obj: Booking) => obj.id,
  sortComparer: false
})

export const initialState: State = bookingAdapter.getInitialState({
  bookingId: null,
  isLoading: false,
  error:     null,
})

export function reducer(
  state = initialState,
  action: actions.BookingActions
): State {
  switch(action.type) {

    case actions.QUERY:
    case actions.SELECT:
    case actions.FILTER: {
      return bookingAdapter.removeAll({
        ...state,
        isLoading: true,
        error:     null,
      })
    }

    case actions.BOOK:
    case actions.APPROVE:
    case actions.REJECT: {
      return {
        ...state,
        isLoading: true,
        error:     null,
      }
    }

    case actions.ADDED: {
      return bookingAdapter.addOne(action.payload, {
        ...state,
        isLoading: false,
      })
    }

    case actions.MODIFIED: {
      return bookingAdapter.updateOne({
        id:      action.payload.id,
        changes: action.payload,
      }, {
        ...state,
        isLoading: false,
      })
    }

    case actions.REMOVED: {
      return bookingAdapter.removeOne(action.payload.id, {
        ...state,
        isLoading: false,
      })
    }

    case actions.SUCCESS: {
      return {
        ...state,
        bookingId: action.bookingId || null,
        isLoading: false,
      }
    }

    case actions.FAIL: {
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

export const getBookingId = (state: State) => state.bookingId
export const isLoading    = (state: State) => state.isLoading
export const getError     = (state: State) => state.error
