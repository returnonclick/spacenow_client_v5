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
  authUser$: Observable<User>
  authUser: User
  userProfile$: Observable<Profile>
  storagePath: string = `/images/users-profile/{$usersProfileID}/{$imageID}/{IMAGE_SIZE.JPG}`

  constructor(
    private _store: Store<fromRoot.State>
  ) {

    this.isLoading$ = this._store.pipe(select(fromRoot.getIsLoadingProfile))
    this.userProfile$ = this._store.pipe(select(fromRoot.getSelectedUserProfile))
    this.authUser$ = this._store.pipe(select(fromRoot.getAuthUser))
    this.authUser$.subscribe(
      (user) => {
        if (user) {
          this.authUser = user
          this.storagePath = `/images/users-profile/${user.uid}`
          return this._store.dispatch(new actions.Query(user.uid))
        }
      })
   }

  ngOnInit() {
    this._store.dispatch(new layoutActions.SetLogoGreen())
  }

  getImage(event) {
    this._store.dispatch(new userActions.Update(this.authUser.uid, { photoURL: event.path }))
  }

}
