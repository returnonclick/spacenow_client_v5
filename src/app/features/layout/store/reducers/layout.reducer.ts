import * as layout from '../actions/layout.actions';

export interface State {
  loading: boolean;
  entities: { [id: string]: any };
  result: string[];
}

export const initialState: State = {
  loading: false,
  entities: {},
  result: []
}

export function reducer(state = initialState, action: layout.Actions): State {
  switch (action.type) {
    case layout.LOAD: {
      return {
        ...state,
        loading: true
      }
    }

    case layout.LOAD_SUCCESS: {

      return {
        ...state,
        loading: false,
      };
    }

     case layout.LOAD_FAIL: {

      return {
        ...state,
        loading: false,
      };
    }

    default: {
      return state;
    }
  }
}