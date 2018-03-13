import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { AbstractControl, FormBuilder, FormGroup, Validators, FormArray, FormControl, ValidatorFn } from '@angular/forms'
import { AngularFireAuth } from 'angularfire2/auth'
import * as firebase from 'firebase/app'

import { Store, State, select } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'

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
  error$: Observable<string>
  success$: Observable<string>

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private _store: Store<fromRoot.State>
  ) { 
    this.error$ = this._store.pipe(select(fromRoot.getAuthError))
    this.success$ = this._store.pipe(select(fromRoot.getAuthSuccess))
  }

  ngOnInit() {
    this.forgotForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(EMAIL_REGEXP)])],
      }
    )
  }

  //forgot
  onForgotSubmit() {
    this._store.dispatch(new actions.ForgotPassword(this.forgotForm.value))
  }

  getErrorMessage() {
    return this.forgotForm.controls.email.hasError('required') ? 'You must enter a value' :
    this.forgotForm.controls.email.hasError('email') ? 'Not a valid email' :
    '';
  }

}
