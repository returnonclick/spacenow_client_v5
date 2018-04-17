import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { map, mergeMap, switchMap } from 'rxjs/operators'

import { Booking } from '@models/booking'
import { BookingService } from '@core/store/bookings/services/booking'

import * as actions from '@core/store/bookings/actions/booking'

@Injectable()
export class BookingEffects {

  @Effect()
  query$ = this._actions$.pipe(
    ofType<actions.Query>(actions.QUERY),
    switchMap(action => this._service.query(action.userId)),
    mergeMap(changes => changes),
    map(change => {
      return {
        type:    `[Booking] ${change.type}`,
        payload: new Booking(change.doc.data()),
      }
    }),
  )

  @Effect()
  select$ = this._actions$.pipe(
    ofType<actions.Select>(actions.SELECT),
    switchMap(action => this._service.select(action.bookingId)),
    map(action => new actions.Added(
      new Booking(action.payload.data())
    )),
  )

  @Effect()
  book$ = this._actions$.pipe(
    ofType<actions.Book>(actions.BOOK),
    switchMap(action =>
      this._service.book(action.booking)
        .then(() => new actions.Success)
        .catch(err => new actions.Fail(err)),
    ),
  )

  @Effect()
  checkout$ = this._actions$.pipe(
    ofType<actions.Checkout>(actions.CHECKOUT),
    switchMap(action =>
      this._service.checkout(action.booking)
        .then(bookingId => new actions.Success(bookingId))
        .catch(err => new actions.Fail(err)),
    ),
  )

  constructor(
    private _actions$: Actions,
    private _service:  BookingService,
  ) { }

}
