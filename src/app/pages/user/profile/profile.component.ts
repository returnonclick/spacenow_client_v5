import { Component, OnInit, OnChanges, Input, AfterViewInit, ChangeDetectorRef } from '@angular/core'
import { AbstractControl, FormBuilder, FormGroup, Validators, FormArray, FormControl, ValidatorFn } from '@angular/forms'
import { Router, ActivatedRoute, Params } from '@angular/router'

import { Store, select } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'
import { map, combineLatest } from 'rxjs/operators'

import { Contact } from '@shared/models/contact'
import { Card } from '@shared/models/card'
import { User } from '@models/user'
import { Profile } from '@models/profile'

import * as profileActions from '@core/store/users-profile/actions/user-profile'
import * as userActions from '@core/store/users/actions/user'
import * as layoutActions from '@core/store/layouts/actions/layout'
import * as fromRoot from '@core/store'

@Component({
  selector: 'sn-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  isLoading$:   Observable<boolean>
  authUser$:    Observable<User>
  userProfile$: Observable<Profile>

  authUser:     User
  storagePath:  string = `/images/users-profile/{$usersProfileID}/{$imageID}/{IMAGE_SIZE.JPG}`
  profile:      Profile
  aboutMeForm:  FormGroup
  profileForm:  FormGroup

  constructor(
    private _store: Store<fromRoot.State>,
    private _fb:    FormBuilder,
    private cdRef: ChangeDetectorRef
  ) {
    this.isLoading$   = this._store.pipe(select(fromRoot.getIsLoadingProfile))
    this.userProfile$ = this._store.pipe(select(fromRoot.getSelectedUserProfile))
    this.authUser$    = this._store.pipe(select(fromRoot.getAuthUser))

    this.aboutMeForm = this._fb.group({
      aboutMe: [ '' ]
    })

    this.authUser$.subscribe(user => {
      if(user) {
        this.authUser    = user
        this.storagePath = `/images/users-profile/${user.uid}`
        this._store.dispatch(new profileActions.Query(user.uid))
      }
    })
    this.userProfile$.subscribe(profile => {
      console.log(profile)
      if(profile) {
        this.profile = profile
        this.aboutMeForm.get('aboutMe').setValue(this.profile.aboutMe)
      }
    })
   }

  ngOnInit() {
    this._store.dispatch(new layoutActions.SetLogoGreen())
    this.createForm()
  }

  createForm() {
    this.profileForm = this._fb.group({})
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  onSubmit() {
    this.profileForm.updateValueAndValidity()
    if(this.profileForm.invalid)
      return
    let frmProfile = Object.assign({}, this.profileForm.value);
    this.profile = Object.assign(this.profile, this.profileForm.value)
    this._store.dispatch(new profileActions.Update( this.profile.uid, this.profile ))
  }

  getImage(event) {
    this._store.dispatch(
      new userActions.Update(
        this.authUser.uid,
        { photoURL: event.imageURL }
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