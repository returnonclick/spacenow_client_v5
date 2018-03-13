import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute, Params } from '@angular/router'

import { Store, select } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'
import { Profile } from '@shared/models/profile'
import { User } from '@shared/models/user'

import * as actions from '@core/store/users-profile/actions/user-profile'
import * as userActions from '@core/store/users/actions/user'
import * as authActions from '@core/store/auth/actions/auth'
import * as layoutActions from '@core/store/layouts/actions/layout'
import * as fromRoot from '@core/store'

@Component({
  selector: 'sn-profile-container',
  templateUrl: './profile-container.component.html',
  styleUrls: ['./profile-container.component.scss']
})
export class ProfileContainerComponent implements OnInit {

  isLoading$: Observable<boolean>
  authId$: Observable<string>
  authId: string
  authUser$: Observable<User>
  userProfile$: Observable<Profile>
  storagePath: string = `/images/users-profile/{$usersProfileID}/{$imageID}/{IMAGE_SIZE.JPG}`

  constructor(
    private _store: Store<fromRoot.State>
  ) {

    this.isLoading$ = this._store.pipe(select(fromRoot.getIsLoadingProfile))
    this.authId$ = this._store.pipe(select(fromRoot.getSelectedAuthId))
    this.userProfile$ = this._store.pipe(select(fromRoot.getSelectedUserProfile))
    this.authUser$ = this._store.pipe(select(fromRoot.getSelectedAuth))

   }

  ngOnInit() {
    this._store.dispatch(new layoutActions.SetLogoGreen())
    this.authId$.subscribe(
      id => {
        this.authId = id
        this.storagePath = `/images/users-profile/${id}`
        return this._store.dispatch(new actions.Query(id))
      })
  }

  getImage(event) {
    this._store.dispatch(new userActions.Update(this.authId, { photoURL: event.path }))
  }

}
