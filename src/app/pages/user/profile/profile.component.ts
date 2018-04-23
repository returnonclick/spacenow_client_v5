import { Component, OnInit, OnChanges, Input, AfterViewInit, ChangeDetectorRef } from '@angular/core'
import { AbstractControl, FormBuilder, FormGroup, Validators, FormArray, FormControl, ValidatorFn } from '@angular/forms'
import { Router, ActivatedRoute, Params } from '@angular/router'

import { Store, select } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'
import { map, combineLatest } from 'rxjs/operators'
import { User } from '@shared/models/user'
import { Profile } from '@shared/models/profile'
import { Contact } from '@shared/models/contact'
import { Card } from '@shared/models/card'

import * as actions from '@core/store/auth/actions/auth'
import * as profileActions from '@core/store/users-profile/actions/user-profile'
import * as fromRoot from '@core/store'

@Component({
  selector: 'sn-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  @Input('profile')
  public profile: Profile

  public profileForm: FormGroup

  constructor(
    private _fb: FormBuilder,
    private _store: Store<fromRoot.State>,
    private cdRef: ChangeDetectorRef
  ) {
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

}