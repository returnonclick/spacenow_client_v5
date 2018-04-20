import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Observable } from 'rxjs/Observable'
import { map, mergeMap, switchMap } from 'rxjs/operators'

import { User } from '@models/user'
import { UserService } from '@core/store/users/services'

import * as actions from '@core/store/users/actions/user'
import * as authActions from '@core/store/auth/actions/auth'

@Injectable()
export class UserEffects {

  @Effect()
  query$ = this.actions$.pipe(
    ofType<actions.Query>(actions.QUERY),
    switchMap(action  => this.userService.readAll()),
    mergeMap(actions => actions),
    map(action => {
      return {
        type:    `[User] ${action.type}`,
        payload: {
          id: action.payload.doc.id,
          ...action.payload.doc.data()
        },
      }
    })
  )

  @Effect()
  select$ = this.actions$.pipe(
    ofType<actions.Select>(actions.SELECT),
    switchMap(action => this.userService.select(action.userIds)),
    map(action => new actions.Added(
      new User(action.payload.data())
    ))
  )

  @Effect()
  readRoleByUser$ = this.actions$.pipe(
    ofType<actions.ReadRoleByUser>(actions.READ_ROLE_BY_USER),
    switchMap(payload  => payload.role),
    map(role => this.userService.readRoleByUser(role)),
    mergeMap(actions => actions),
    switchMap(action => action),
    map(action => {
      return {
        type:    `[User] ${action.type} ${action.payload.doc.data().roles}`,
        payload: {
          id: action.payload.doc.id,
          ...action.payload.doc.data(),
        },
      }
    })
  )

  @Effect()
  create$ = this.actions$.pipe(
    ofType<actions.Create>(actions.CREATE),
    switchMap(data =>
      Observable.fromPromise(this.userService.create(data.payload))
    ),
    map(() => new actions.Success)
  )

  @Effect()
  update$ = this.actions$.pipe(
    ofType<actions.Update>(actions.UPDATE),
    switchMap(data =>
      Observable.fromPromise(this.userService.update(data.id, data.changes))
    ),
    map(() => [
      new actions.Success,
      new authActions.GetUser,
    ]),
    mergeMap(actions => actions),
  )

  @Effect()
  delete$ = this.actions$.pipe(
    ofType<actions.Delete>(actions.DELETE),
    switchMap(data =>
      Observable.fromPromise(this.userService.delete(data.id))
    ),
    map(() => new actions.Success)
  )

  constructor(
    private actions$:    Actions,
    private userService: UserService,
  ) { }

}
