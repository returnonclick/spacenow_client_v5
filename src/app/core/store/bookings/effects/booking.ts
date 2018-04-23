import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { map, mergeMap, startWith, switchMap } from 'rxjs/operators'

import { Booking, BookingStatus } from '@models/booking'
import { BookingService } from '@core/store/bookings/services/booking'

import * as actions from '@core/store/bookings/actions/booking'

@Injectable()
export class BookingEffects {

  @Effect()
  query$ = this._actions$.pipe(
    ofType<actions.Query>(actions.QUERY),
    switchMap(action => this._service.query(action.userId)),
    mergeMap(changes => [
      new actions.Success,
      ...changes,
    ]),
    map(change =>
      change.type == actions.SUCCESS
        ? change
        : {
          type:    `[Booking] ${change.type}`,
          payload: new Booking(change.payload.doc.data()),
        }
    ),
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
  filter$ = this._actions$.pipe(
    ofType<actions.Filter>(actions.FILTER),
    switchMap(action => this._service.filter(action.spaceIds, action.status)),
    mergeMap(changes => [
      new actions.Success,
      ...changes,
    ]),
    map(change =>
      change.type == actions.SUCCESS
        ? change
        : {
          type:    `[Booking] ${change.type}`,
          payload: new Booking(change.payload.doc.data()),
        }
    )
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
  bookRequest$ = this._actions$.pipe(
    ofType<actions.Approve | actions.Reject>(actions.APPROVE, actions.REJECT),
    switchMap(action =>
      this._service.modifyBooking(
        action.bookingId,
        action.type == actions.APPROVE
          ? BookingStatus.APPROVED
          : BookingStatus.DECLINED,
      )
        .then(() => new actions.Success)
        .catch(err=> new actions.Fail(err))
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
