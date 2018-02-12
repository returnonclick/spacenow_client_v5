import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createFeatureSelector } from '@ngrx/store';
import { PostModel } from '@models/post/post.model';
import { PostActions, PostActionTypes } from './post.actions';

export interface State extends EntityState<PostModel> {
  // additional entities state properties
}

export const adapter: EntityAdapter<PostModel> = createEntityAdapter<PostModel>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export const getPostState = createFeatureSelector<State>('post');

export function reducer(
  state = initialState,
  action: PostActions
): State {
  switch (action.type) {
    case PostActionTypes.AddPost: {
      return adapter.addOne(action.payload.post, state);
    }

    case PostActionTypes.AddPosts: {
      return adapter.addMany(action.payload.posts, state);
    }

    case PostActionTypes.UpdatePost: {
      return adapter.updateOne(action.payload.post, state);
    }

    case PostActionTypes.UpdatePosts: {
      return adapter.updateMany(action.payload.posts, state);
    }

    case PostActionTypes.DeletePost: {
      return adapter.removeOne(action.payload.id, state);
    }

    case PostActionTypes.DeletePosts: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case PostActionTypes.LoadPostsSuccess: {
      return adapter.addAll(action.payload.posts, state);
    }

    case PostActionTypes.ClearPosts: {
      return adapter.removeAll(state);
    }

    default: {
      return state;
    }
  }
}

export const {
  selectIds: selectPostIds,
  selectEntities: selectPostEntities,
  selectAll: selectAllPosts,
  selectTotal: selectPostTotal,
} = adapter.getSelectors(getPostState);
