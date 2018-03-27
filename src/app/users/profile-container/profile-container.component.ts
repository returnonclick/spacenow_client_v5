import { Component } from '@angular/core'
import { FormGroup, FormBuilder } from '@angular/forms'
import { Store, select } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'

import { User } from '@models/user'
import { Profile } from '@models/profile'

import * as profileActions from '@core/store/users-profile/actions/user-profile'
import * as userActions from '@core/store/users/actions/user'
import * as layoutActions from '@core/store/layouts/actions/layout'
import * as fromRoot from '@core/store'

@Component({
  selector: 'sn-profile-container',
  templateUrl: './profile-container.component.html',
  styleUrls: [ './profile-container.component.scss' ]
})
export class ProfileContainerComponent {

  isLoading$:   Observable<boolean>
  authUser$:    Observable<User>
  userProfile$: Observable<Profile>

  authUser:     User
  storagePath:  string = `/images/users-profile/{$usersProfileID}/{$imageID}/{IMAGE_SIZE.JPG}`
  profile:      Profile
  aboutMeForm:  FormGroup

  constructor(
    private _store: Store<fromRoot.State>,
    private _fb:    FormBuilder,
  ) {

    this.isLoading$   = this._store.pipe(select(fromRoot.getIsLoadingProfile))
    this.userProfile$ = this._store.pipe(select(fromRoot.getSelectedUserProfile))
    this.authUser$    = this._store.pipe(select(fromRoot.getAuthUser))

    this.authUser$.subscribe(user => {
      if(user) {
        this.authUser    = user
        this.storagePath = `/images/users-profile/${user.uid}`
        this._store.dispatch(new profileActions.Query(user.uid))
      }
    })
    this.userProfile$.subscribe(profile => {
      if(profile)
        this.profile = profile
    })
   }

  ngOnInit() {
    this._store.dispatch(new layoutActions.SetLogoGreen())

    this.aboutMeForm = this._fb.group({
      aboutMe: [ '' ]
    })
  }

  getImage(event) {
    this._store.dispatch(
      new userActions.Update(
        this.authUser.uid,
        { photoURL: event.path }
      )
    )
  }

  setAboutMe() {
    if(this.aboutMeForm.invalid)
      return

    this.profile.aboutMe = this.aboutMeForm.value.aboutMe
    this._store.dispatch(
      new profileActions.Update(this.profile.uid, this.profile)
    )
  }

}
