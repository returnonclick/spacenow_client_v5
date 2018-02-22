import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { AbstractControl, FormBuilder, FormGroup, Validators, FormArray, FormControl, ValidatorFn } from '@angular/forms'
import { AngularFireAuth } from 'angularfire2/auth'
import * as firebase from 'firebase/app'

import { Store, State } from '@ngrx/store'

import { AuthService } from '@core/store/auth/services'
import { fadeInAnimation } from "@shared/animations/animations"
import * as actions from '@core/store/auth/actions/auth'
import * as fromRoot from '@core/store'

const EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

@Component({
  selector: 'gen-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  host: {
    '[@fadeInAnimation]': 'true'
  },
  animations: [ fadeInAnimation ]
})
export class ForgotPasswordComponent implements OnInit {

  forgotForm: FormGroup

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private _store: Store<fromRoot.State>
  ) { }

  ngOnInit() {
    this.forgotForm = this.fb.group({
      forgotForm: ['', Validators.compose([Validators.required, Validators.pattern(EMAIL_REGEXP)])],
      }
    )
  }

  //forgot
  onForgotSubmit() {
    this._store.dispatch(
      new actions.SignIn(this.forgotForm.value)
    )
  }

}
