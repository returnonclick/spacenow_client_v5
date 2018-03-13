import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Space } from '@models/space';
import { SpaceActions, SpaceActionTypes } from './space.actions';

export interface State extends EntityState<Space> {
  // additional entities state properties
  selectedSpaceID: string | null
}

export const adapter: EntityAdapter<Space> = createEntityAdapter<Space>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  loading: false,
  selectedSpaceID: null
});

export function reducer(
  state = initialState,
  action: SpaceActions
): State {
  switch (action.type) {
    // case SpaceActionTypes.AddSpace: {
    //   return adapter.addOne(action.payload.space, state);
    // }
    //
    // case SpaceActionTypes.AddSpaces: {
    //   return adapter.addMany(action.payload.spaces, state);
    // }
    //
    // case SpaceActionTypes.UpdateSpace: {
    //   return adapter.updateOne(action.payload.space, state);
    // }
    //
    // case SpaceActionTypes.UpdateSpaces: {
    //   return adapter.updateMany(action.payload.spaces, state);
    // }
    //
    // case SpaceActionTypes.DeleteSpace: {
    //   return adapter.removeOne(action.payload.id, state);
    // }
    //
    // case SpaceActionTypes.DeleteSpaces: {
    //   return adapter.removeMany(action.payload.ids, state);
    // }

    // case SpaceActionTypes.LoadSpaces: {
    //   return adapter.addAll(action.payload.spaces, state);
    // }

    // case SpaceActionTypes.ClearSpaces: {
    //   return adapter.removeAll(state);
    // }
    //

    case SpaceActionTypes.LoadSpacesSuccess: {
      return adapter.addAll(action.payload.spaces, state)
    }

    case SpaceActionTypes.LoadSpaceSuccess: {
      return adapter.addOne(action.payload.space, state)
    }

    default: {
      return state;
    }
  }
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
