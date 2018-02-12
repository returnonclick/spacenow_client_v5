import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '@environments/environment';
import * as fromUser from './user/user.reducer';
import * as fromPost from './post/post.reducer';

export interface State {

  user: fromUser.State;
  post: fromPost.State;
}

export const reducers: ActionReducerMap<State> = {

  user: fromUser.reducer,
  post: fromPost.reducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

export const selectPostState = createFeatureSelector<fromPost.State>('post');

export const selectPostIds = createSelector(selectPostState, fromPost.selectPostIds);
export const selectPostEntities = createSelector(selectPostState, fromPost.selectPostEntities);
export const selectAllPosts = createSelector(selectPostState, fromPost.selectAllPosts);
export const selectPostTotal = createSelector(selectPostState, fromPost.selectPostTotal);
// export const selectCurrentPostId = createSelector(selectPostState, fromPost.getSelectedPostId);
//
// export const selectCurrentPost = createSelector(
//   selectPostEntities,
//   selectCurrentPostId,
//   (postEntities, postId) => postEntities[postId]
// );
