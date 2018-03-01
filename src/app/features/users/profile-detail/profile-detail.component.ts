import { Component, OnInit, OnChanges, Input } from '@angular/core'
import { AbstractControl, FormBuilder, FormGroup, Validators, FormArray, FormControl, ValidatorFn } from '@angular/forms'
import { Router, ActivatedRoute, Params } from '@angular/router'

import { Store, select } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'
import { map, combineLatest } from 'rxjs/operators'
import { User } from '@shared/models/user'
import { Profile } from '@shared/models/profile'
import { Contact } from '@shared/models/contact'
import { Address } from '@shared/models/address'

import * as actions from '@core/store/auth/actions/auth'
import * as profileActions from '@core/store/users-profile/actions/user-profile'
import * as fromRoot from '@core/store'

@Component({
  selector: 'sn-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.scss']
})
export class ProfileDetailComponent implements OnChanges {

  @Input('profile')
  public profile: Profile

  profileForm: FormGroup

  constructor(
    private _fb: FormBuilder,
    private _store: Store<fromRoot.State>
  ) {
    this.createForm()
  }

  createForm() {
    this.profileForm = this._fb.group({})
  }

  ngOnChanges() {
    // this.profileForm = this._fb.group({
    //   contact: [this.profile.contact]
    // })
  }

}


//   onSubmit() {

//     console.log(this.userProfile)
//     console.log(this.profileForm.value)

//       this.profileForm.updateValueAndValidity()
//       if(this.profileForm.invalid)
//         return
//       this.userProfile = Object.assign(this.userProfile, this.profileForm.value)
//       this._store.dispatch(new profileActions.Update( this.userProfile.uid, this.userProfile ))
  
//   }