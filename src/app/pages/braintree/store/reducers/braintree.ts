import { createSelector } from '@ngrx/store'
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity'

import { PaymentBooking } from '../../models/payment-booking'

import * as actions from '../../store/actions/braintree'

export const stateIdent = 'braintree'

export interface State {
  isLoading:   boolean
  clientToken: string
  nonce:       any
  error:       any
}

export const initialState: State = {
  isLoading:   false,
  clientToken: null,
  nonce:       null,
  error:       null,
}

export function reducer(
  state = initialState,
  action: actions.BraintreeActions
): State {
  switch(action.type) {

    case actions.GET_CLIENT_TOKEN: {
      return {
        ...state,
        isLoading:   true,
        clientToken: null,
        error:       null,
      }
    }

    case actions.GET_CLIENT_TOKEN_SUCCESS: {
      return {
        ...state,
        isLoading:   false,
        clientToken: action.clientToken,
      }
    }

    case actions.GET_CLIENT_TOKEN_FAIL: {
      return {
        ...state,
        isLoading: false,
        error:     action.err,
      }
    }

    case actions.REQUEST_NONCE: {
      return {
        ...state,
        isLoading: true,
        nonce:     null,
        error:     null,
      }
    }

    case actions.REQUEST_NONCE_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        nonce:     action.nonce,
      }
    }

    case actions.REQUEST_NONCE_FAIL: {
      return {
        ...state,
        isLoading: false,
        error:     action.error
      }
    }

    case actions.PAY: {
      return {
        ...state,
        isLoading: true,
        error: null,
      }
    }

    case actions.PAY_SUCCESS: {
      return {
        ...state,
        isLoading: false,
      }
    }

    case actions.PAY_FAIL: {
      return {
        ...state,
        isLoading: false,
        error: action.error,
      }
    }

    default: {
      return state
    }

  }
}

export const isLoading      = (state: State) => state[stateIdent].isLoading
export const getClientToken = (state: State) => state[stateIdent].clientToken
export const getNonce       = (state: State) => state[stateIdent].nonce
export const getError       = (state: State) => state[stateIdent].error
