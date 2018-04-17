import {
  ActionReducerMap,
  createSelector,
  createFeatureSelector,
  ActionReducer,
  MetaReducer,
} from '@ngrx/store'
import { environment } from '../../../environments/environment'
import { RouterStateUrl } from './utils'

/**
 * storeFreeze prevents state from being mutated. When mutation occurs, an
 * exception will be thrown. This is useful during development mode to
 * ensure that none of the reducers accidentally mutates the state.
 */
// import { storeFreeze } from 'ngrx-store-freeze'

/**
 * Every reducer module's default export is the reducer function itself. In
 * addition, each module should export a type or interface that describes
 * the state of the reducer plus any selector functions. The `* as`
 * notation packages up all of the exports into a single object.
 */

/**
 * The following line about layout is commented, but you can refer to * https://github.com/ngrx/platform/blob/master/example-app/app/reducers/index.ts * for detailed implementations
 */
import * as fromRouter                from '@ngrx/router-store'
import * as fromAuth                  from '@core/store/auth/reducers/auth'
import * as fromUsers                 from '@core/store/users/reducers/users'
import * as fromUsersProfile          from '@core/store/users-profile/reducers/users-profile'
import * as fromLayouts               from '@core/store/layouts/reducers/layouts'
import * as fromListings              from '@core/store/listings/reducers/listings'
import * as fromListingsShortDetail   from '@core/store/listings-short-detail/reducers/listing-short-detail'
import * as fromCategories            from '@core/store/categories/reducers/categories'
import * as fromSearch                from '@core/store/search/reducers/search'
import * as fromSpaces                from '@core/store/spaces/reducers/spaces'
import * as fromBooking               from '@core/store/bookings/reducers/booking'
import * as fromAmenities             from '@core/store/amenities/reducers/amenities'
import * as fromListingSpecifications from '@core/store/listing-specifications/reducers/listing-specifications'

/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface State {
  auth:                  fromAuth.State
  users:                 fromUsers.State
  usersProfile:          fromUsersProfile.State
  layouts:               fromLayouts.State
  listings:              fromListings.State
  listingsShortDetail:   fromListingsShortDetail.State
  categories:            fromCategories.State
  search:                fromSearch.State
  spaces:                fromSpaces.State
  bookings:              fromBooking.State
  amenities:             fromAmenities.State
  listingSpecifications: fromListingSpecifications.State
  routerReducer:         fromRouter.RouterReducerState<RouterStateUrl>
}

/**
 * Our state is composed of a map of action reducer functions.
 * These reducer functions are called with each dispatched action
 * and the current or initial state and return a new immutable state.
 */
export const reducers: ActionReducerMap<State> = {
  auth:                  fromAuth.reducer,
  users:                 fromUsers.reducer,
  usersProfile:          fromUsersProfile.reducer,
  layouts:               fromLayouts.reducer,
  listings:              fromListings.reducer,
  listingsShortDetail:   fromListingsShortDetail.reducer,
  categories:            fromCategories.reducer,
  spaces:                fromSpaces.reducer,
  search:                fromSearch.reducer,
  bookings:              fromBooking.reducer,
  amenities:             fromAmenities.reducer,
  listingSpecifications: fromListingSpecifications.reducer,
  routerReducer:         fromRouter.routerReducer,
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
  ? [ logger ]
  : []

/**
 * Router Reducers
 */

// export const getRouterState = createFeatureSelector<fromRouter.RouterReducerState>('routerReducer')
// export const getRouter = createSelector(
//     getRouterState,
//     (state) => state.navigationId
// )

/**
 * Auth Reducers
 */
export const getAuthState = createFeatureSelector<fromAuth.State>('auth')

export const getAuthUser = createSelector(
  getAuthState,
  (state) => state.user,
)

export const getIsSignedIn = createSelector(
  getAuthState,
  (state) => state.isSignedIn,
)

export const getAuthError = createSelector(
  getAuthState,
  (state) => state.error,
)

/**
 * Users Reducer
 */
export const getUsersState = createFeatureSelector<fromUsers.State>('users')

export const getUserEntitiesState = createSelector(
  getUsersState,
  (state) => state,
)

export const getSelectedUserId = createSelector(
  getUserEntitiesState,
  fromUsers.getSelectedId,
)

export const {
  selectIds:      getUserIds,
  selectEntities: getUserEntities,
  selectAll:      getAllUsers,
  selectTotal:    getTotalUsers,
} = fromUsers.userAdapter.getSelectors(getUserEntitiesState)

export const getSelectedUser = createSelector(
  getUserEntities,
  getSelectedUserId,
  (entities, selectedId) => {
    return selectedId && entities[selectedId]
  },
)

/**
 * Users Profile Reducer
 */
export const getUsersProfileState = createFeatureSelector<fromUsersProfile.State>('usersProfile')

export const getUserProfileEntitiesState = createSelector(
  getUsersProfileState,
  (state) => state,
)

export const {
  selectIds:      getUserProfileIds,
  selectEntities: getUserProfileEntities,
  selectAll:      getAllUsersProfile,
  selectTotal:    getTotalUsersProfile,
} = fromUsersProfile.userProfileAdapter.getSelectors(getUserProfileEntitiesState)

export const getSelectedUserProfile = createSelector(
  getUserProfileEntities,
  getUsersProfileState,
  (entities, profileState) => {
    return profileState.selectedId && entities[profileState.selectedId]
  },
)

export const getSelectedUserProfileId = createSelector(
  getUsersProfileState,
  (state) => state.selectedId,
)

export const getIsLoadingProfile = createSelector(
  getUsersProfileState,
  (state) => state.loading,
)

/**
 * Listings Reducers
 */
export const getListingsState = createFeatureSelector<fromListings.State>('listings')

export const getListingEntitiesState = createSelector(
  getListingsState,
  (state) => state,
)

export const getSelectedListingId = (state: fromListings.State) => state.selectedListingId
export const selectCurrentListingId = createSelector(getListingsState, getSelectedListingId)

export const selectListingEntities = createSelector(getListingsState, (listingsState) => listingsState.entities)
export const selectCurrentListing = createSelector(
  selectListingEntities,
  selectCurrentListingId,
  (listingEntities, listingId) => listingEntities[listingId],
)

export const {
  selectIds:      getListingIds,
  selectEntities: getListingEntities,
  selectAll:      getAllListings,
  selectTotal:    getTotalListings,
} = fromListings.listingAdapter.getSelectors(getListingEntitiesState)

export const getSelectedListing = createSelector(
  getListingEntities,
  getSelectedListingId,
  (listingEntities, listingId) => listingEntities[listingId]
)

export const getIsListingLoading = createSelector(
  getListingsState,
  (state) => state.loading,
)


/**
 * Listings Short Detail Reducers
 */
export const getListingsShortDetailState = createFeatureSelector<fromListingsShortDetail.State>('listingsShortDetail')

export const getListingsShortDetailEntitiesState = createSelector(
  getListingsShortDetailState,
  (state) => state,
)

export const {
  selectIds:      getListingsShortDetailIds,
  selectEntities: getListingsShortDetailEntities,
  selectAll:      getAllListingsShortDetail,
  selectTotal:    getTotalListingsShortDetail,
} = fromListingsShortDetail.listingShortDetailAdapter.getSelectors(getListingsShortDetailEntitiesState)


/**
 * Layouts Reducers
 */
export const getLayoutsState = createFeatureSelector<fromLayouts.State>('layouts')

export const getShowSidenav = createSelector(
  getLayoutsState,
  (state) => state.showSidenav,
)

export const getLogo = createSelector(
  getLayoutsState,
  (state) => state.logo,
)

export const getSidenavComponent = createSelector(
  getLayoutsState,
  (state) => state.sidenavComponent,
)

/**
 * Categories Reducers
 */
export const getCategoriesState = createFeatureSelector<fromCategories.State>('categories')

export const getCategoryEntitiesState = createSelector(
  getCategoriesState,
  (state) => state,
)

export const {
  selectIds:      getCategoryIds,
  selectEntities: getCategoryEntities,
  selectAll:      getAllCategories,
  selectTotal:    getTotalCategories,
} = fromCategories.categoryAdapter.getSelectors(getCategoryEntitiesState)

export const getIsCategoryLoading = createSelector(
  getCategoriesState,
  fromCategories.getLoading,
)

/**
 *  Search Reducers
 */
export const getSearchState = createFeatureSelector<fromSearch.State>('search')

export const getSearchEntitiesState = createSelector(
  getSearchState,
  (state) => state,
)

export const {
  selectIds:      getSearchIds,
  selectEntities: getSearchEntities,
  selectAll:      getAllSearches,
  selectTotal:    getTotalSearches,
} = fromSearch.searchAdapter.getSelectors(getSearchEntitiesState)
export const isLoadingSearch = createSelector(getSearchState, fromSearch.isLoading)


/**
 *  Spaces Reducers
 */
export const getSpacesState = createFeatureSelector<fromSpaces.State>('spaces')

export const getSpaceEntitiesState = createSelector(
  getSpacesState,
  (state) => state,
)

export const {
  selectIds:      getSpaceIds,
  selectEntities: getSpaceEntities,
  selectAll:      getAllSpaces,
  selectTotal:    getTotalSpaces,
} = fromSpaces.spaceAdapter.getSelectors(getSpaceEntitiesState)
export const isLoadingSpaces = createSelector(getSpacesState, fromSpaces.isLoading)


/**
 *  Bookings Reducer
 */
export const getBookingsState = createFeatureSelector<fromBooking.State>('bookings')

export const {
  selectIds:      getBookingIds,
  selectEntities: getBookingEntities,
  selectAll:      getAllBookings,
  selectTotal:    getTotalBookings,
} = fromBooking.bookingAdapter.getSelectors(getBookingsState)
export const getBookingId      = createSelector(getBookingsState, fromBooking.getBookingId)
export const isBookingsLoading = createSelector(getBookingsState, fromBooking.isLoading)
export const getBookingsError  = createSelector(getBookingsState, fromBooking.getError)

/**
 * Amenities Reducers
 */
export const getAmenitiesState = createFeatureSelector<fromAmenities.State>('amenities')

export const getAmenityEntitiesState = createSelector(
  getAmenitiesState,
  (state) => state,
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
  (state) => state,
)

export const {
  selectIds:      getListingSpecificationIds,
  selectEntities: getListingSpecificationEntities,
  selectAll:      getAllListingSpecifications,
  selectTotal:    getTotalListingSpecifications,
} = fromListingSpecifications.listingSpecificationAdapter.getSelectors(getListingSpecificationEntitiesState)
