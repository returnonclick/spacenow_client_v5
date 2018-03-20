import { Component, Input, OnInit, OnDestroy } from '@angular/core'
import {Router}                   from "@angular/router"

import { AbstractControl, FormBuilder, FormGroup, Validators, FormArray, FormControl, ValidatorFn } from '@angular/forms'
import { AngularFireAuth }        from 'angularfire2/auth'
import * as firebase              from 'firebase/app'

import { Store, State, select }   from '@ngrx/store'
import { Observable }             from 'rxjs/Observable'

import { AuthService }            from '@core/store/auth/services'
import { fadeInAnimation }        from "@shared/animations/animations"
import * as actions               from '@core/store/auth/actions/auth'
import * as layoutActions         from '@core/store/layouts/actions/layout'
import * as fromRoot              from '@core/store'

const EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/


@Component({
  selector: 'gen-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  providers: [ AuthService ],
  host: {
    '[@fadeInAnimation]': 'true'
  },
  animations: [ fadeInAnimation ]
})
export class SignInComponent implements OnInit {

  signinForm: FormGroup
  error$: Observable<string>

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private _store: Store<fromRoot.State>
  ) {
    this.error$ = this._store.pipe(select(fromRoot.getAuthError))
  }

  ngOnInit() {
    this.signinForm = this.fb.group({
        username: ['', Validators.compose([Validators.required, Validators.pattern(EMAIL_REGEXP)])],
        password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
      }
    )
  }

  //signin
  onSigninSubmit() {
    this._store.dispatch(new actions.SignIn(this.signinForm.value))
  }

  googleLogin() {
    this._store.dispatch(new actions.SignInWithProvider(new firebase.auth.GoogleAuthProvider()))
  }

  facebookLogin() {
    this._store.dispatch(new actions.SignInWithProvider(new firebase.auth.FacebookAuthProvider()))
  }

  setSidenavRegister() {
    this._store.dispatch(new layoutActions.SetSidenavRegister())
  }

  setSidenavForgotPassword() {
    this._store.dispatch(new layoutActions.SetSidenavForgotPassword)
  }

}
