import {
    ActionReducerMap,
    createSelector,
    createFeatureSelector,
    ActionReducer,
    MetaReducer,
} from '@ngrx/store'
import { environment } from '../../../environments/environment'
import { RouterStateUrl } from './utils'
import * as fromRouter from '@ngrx/router-store'

/**
 * storeFreeze prevents state from being mutated. When mutation occurs, an
 * exception will be thrown. This is useful during development mode to
 * ensure that none of the reducers accidentally mutates the state.
 */
import { storeFreeze } from 'ngrx-store-freeze'

/**
 * Every reducer module's default export is the reducer function itself. In
 * addition, each module should export a type or interface that describes
 * the state of the reducer plus any selector functions. The `* as`
 * notation packages up all of the exports into a single object.
 */

/** * The following line about layout is commented, but you can refer to * https://github.com/ngrx/platform/blob/master/example-app/app/reducers/index.ts * for detailed implementations
 */

import * as fromAuth            from '@core/store/auth/reducers/auth'
import * as fromUsers           from '@core/store/users/reducers/users'
import * as fromListings        from '@core/store/listings/reducers/listings'
import * as fromCategories      from '@core/store/categories/reducers/categories'
import * as fromSearch          from '@core/store/search/reducers/search'

/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface State {
    auth:          fromAuth.State
    users:         fromUsers.State
    listings:      fromListings.State
    categories:    fromCategories.State
    search:        fromSearch.State
    routerReducer: fromRouter.RouterReducerState<RouterStateUrl>
}

/**
 * Our state is composed of a map of action reducer functions.
 * These reducer functions are called with each dispatched action
 * and the current or initial state and return a new immutable state.
 */
export const reducers: ActionReducerMap<State> = {
    auth:          fromAuth.reducer,
    users:         fromUsers.reducer,
    listings:      fromListings.reducer,
    categories:    fromCategories.reducer,
    search:        fromSearch.reducer,
    routerReducer: fromRouter.routerReducer,
}

// console.log all actions
export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
    return function (state: State, action: any): State {
        console.log('state', state)
        console.log('action', action)

        return reducer(state, action)
    }
}

/**
 * By default, @ngrx/store uses combineReducers with the reducer map to compose
 * the root meta-reducer. To add more meta-reducers, provide an array of meta-reducers
 * that will be composed to form the root meta-reducer.
 */
export const metaReducers: MetaReducer<State>[] = !environment.production
    ? [logger, storeFreeze]
    : []

/**
 * Auth Reducers
 */
export const getAuthState = createFeatureSelector<fromAuth.State>('auth')

export const getAuthEntitiesState = createSelector(
    getAuthState,
    (state) => state
)

export const getSelectedAuthId = createSelector(
    getAuthEntitiesState,
    fromAuth.getSelectedId
)

export const {
    selectIds: getAuthIds,
    selectEntities: getAuthEntities,
    selectAll: getAllAuth,
    selectTotal: getTotalAuth,
  } = fromAuth.authAdapter.getSelectors(getAuthEntitiesState)

export const getAuthUserState = createSelector(
    getAuthState,
    fromAuth.getAuthUser
)

export const getIsSignedInState = createSelector(
    getAuthState,
    fromAuth.isSignedIn
)

export const getSelectedAuth = createSelector(
    getAuthEntities,
    getSelectedAuthId,
    (entities, selectedId) => {
      return selectedId && entities[selectedId];
    }
)

/**
 * Users Reducer
 */

export const getUsersState = createFeatureSelector<fromUsers.State>('users')

export const getUserEntitiesState = createSelector(
    getUsersState,
    (state) => state
)

export const getSelectedUserId = createSelector(
    getUserEntitiesState,
    fromUsers.getSelectedId
)

export const {
    selectIds: getUserIds,
    selectEntities: getUserEntities,
    selectAll: getAllUsers,
    selectTotal: getTotalUsers,
} = fromUsers.userAdapter.getSelectors(getUserEntitiesState)

export const getSelectedUser = createSelector(
    getUserEntities,
    getSelectedUserId,
    (entities, selectedId) => {
      return selectedId && entities[selectedId];
    }
)

 /**
 * Listings Reducers
 */

export const getListingsState = createFeatureSelector<fromListings.State>('listings')

export const getListingEntitiesState = createSelector(
    getListingsState,
    (state) => state
)

export const {
    selectIds: getListingIds,
    selectEntities: getListingEntities,
    selectAll: getAllListings,
    selectTotal: getTotalListings
  } = fromListings.listingAdapter.getSelectors(getListingEntitiesState)

  
export const getSelectedListing = createSelector(
    getListingEntities,
    fromListings.getSelectedListingId,
    (listingEntities, listingId) => listingEntities[listingId]
)

/**
 * Categories Reducers
 */

export const getCategoriesState = createFeatureSelector<fromCategories.State>('categories')

export const getCategoryEntitiesState = createSelector(
    getCategoriesState,
    (state) => state
)

export const {
    selectIds: getCategoryIds,
    selectEntities: getCategoryEntities,
    selectAll: getAllCategories,
    selectTotal: getTotalCategories,
  } = fromCategories.categoryAdapter.getSelectors(getCategoryEntitiesState)

/**
 *  Search Reducers
 */
export const getSearchState = createFeatureSelector<fromSearch.State>('search')

export const getSearchEntitiesState = createSelector(
  getSearchState,
  (state) => state
)

export const {
  selectIds:      getSearchIds,
  selectEntities: getSearchEntities,
  selectAll:      getAllSearches,
  selectTotal:    getTotalSearches,
} = fromSearch.searchAdapter.getSelectors(getSearchEntitiesState)
export const isLoadingSearch = createSelector(getSearchState, fromSearch.isLoading)
