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
import * as fromSpace from '@core/store/space/space.reducer'
import * as fromAmenities       from '@core/store/amenities/reducers/amenities'
import * as fromListingSpecifications from '@core/store/listing-specifications/reducers/listing-specifications'

/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface State {
    auth:          fromAuth.State
    users:         fromUsers.State
    listings:      fromListings.State
    categories:    fromCategories.State
    routerReducer: fromRouter.RouterReducerState<RouterStateUrl>
    spaces: fromSpace.State
    amenities:     fromAmenities.State
    listingSpecifications:    fromListingSpecifications.State
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
    routerReducer: fromRouter.routerReducer,
    spaces: fromSpace.reducer,
    amenities:     fromAmenities.reducer,
    listingSpecifications:    fromListingSpecifications.reducer,
}

// console.log all actions
export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
    return function (state: State, action: any): State {
        // console.log('state', state)
        // console.log('action', action)

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
    // ? [storeFreeze]
    // ? [logger]
    : []

/**
 * Auth Reducers
 */
export const getAuthState = createFeatureSelector<fromAuth.State>('auth')

export const getAuthEntitiesState = createSelector(
    getAuthState,
    (state) => state
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

/**
 * Users Reducer
 */

export const getUsersState = createFeatureSelector<fromUsers.State>('users')

export const getUserEntitiesState = createSelector(
    getUsersState,
    (state) => state
)

export const {
    selectIds: getUserIds,
    selectEntities: getUserEntities,
    selectAll: getAllUsers,
    selectTotal: getTotalUsers,
  } = fromUsers.userAdapter.getSelectors(getUserEntitiesState)

 /**
 * Listings Reducers
 */

export const getListingsState = createFeatureSelector<fromListings.State>('listings')

export const getListingEntitiesState = createSelector(
    getListingsState,
    (state) => state
)

/* 
 * selectors to select specfic `listing` slices from store
 *  */
export const getSelectedListingId = (state: fromListings.State) => state.selectedListingId
export const selectCurrentListingId = createSelector(getListingsState, getSelectedListingId) 

export const selectListingEntities = createSelector(getListingsState, (listingsState) => listingsState.entities)
export const selectCurrentListing = createSelector(
  selectListingEntities,
  selectCurrentListingId,
  (listingEntities, listingId) => listingEntities[listingId]
)

export const {
    selectIds: getListingIds,
    selectEntities: getListingEntities,
    selectAll: getAllListings,
    selectTotal: getTotalListings
  } = fromListings.listingAdapter.getSelectors(getListingEntitiesState)

export const getIsListingLoading = createSelector(
    getListingsState,
    fromListings.getLoading
)

/* 
 * SPACE REDUCERS
 * **************************************************************************** */
export const getSpaceState = createFeatureSelector<fromSpace.State>('space')

export const getSelectedSpaceID = (state: fromSpace.State) => state.selectedSpaceID
export const selectCurrentSpaceID = createSelector(getSpaceState, getSelectedSpaceID)
export const selectSpaceEntities = createSelector(getSpaceState, (spaceState) => spaceState.entities)
export const selectCurrentSpace = createSelector(
  selectSpaceEntities,
  selectCurrentSpaceID,
  (spaceEntities, spaceID) => spaceEntities[spaceID]
)

/* *********************End of Space reducers **********************************/

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

export const getIsCategoryLoading = createSelector(
    getCategoriesState,
    fromCategories.getLoading
)

/**
* Amenities Reducers
*/
export const getAmenitiesState = createFeatureSelector<fromAmenities.State>('amenities')

export const getAmenityEntitiesState = createSelector(
    getAmenitiesState,
    (state) => state
)

export const {
    selectIds: getAmenityIds,
    selectEntities: getAmenityEntities,
    selectAll: getAllAmenities,
    selectTotal: getTotalAmenities,
  } = fromAmenities.amenityAdapter.getSelectors(getAmenityEntitiesState)

/**
* ListingSpecifications Reducers
*/
export const getListingSpecificationsState = createFeatureSelector<fromListingSpecifications.State>('listingSpecifications')

export const getListingSpecificationEntitiesState = createSelector(
    getListingSpecificationsState,
    (state) => state
)

export const {
    selectIds: getListingSpecificationIds,
    selectEntities: getListingSpecificationEntities,
    selectAll: getAllListingSpecifications,
    selectTotal: getTotalListingSpecifications,
  } = fromListingSpecifications.listingSpecificationAdapter.getSelectors(getListingSpecificationEntitiesState)
