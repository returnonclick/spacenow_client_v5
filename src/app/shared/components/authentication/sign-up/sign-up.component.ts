import { Component, Input, OnInit, OnDestroy } from '@angular/core'
import { AbstractControl, FormBuilder, FormGroup, Validators, FormArray, FormControl, ValidatorFn } from '@angular/forms' 
import { AngularFireAuth } from 'angularfire2/auth'

import { Store, State } from '@ngrx/store'

import { fadeInAnimation } from "@shared/animations/animations"
import * as actions from '@core/store/auth/actions/auth'
import * as fromRoot from '@core/store'

const EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

@Component({
  selector: 'gen-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  host: {
    '[@fadeInAnimation]': 'true'
  },
  animations: [ fadeInAnimation ]
})

export class SignUpComponent implements OnInit {

  signupForm: FormGroup

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private _store: Store<fromRoot.State>
  ) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.pattern(EMAIL_REGEXP)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      confirmPassword: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
      }, {validator: signupFormValidator}
    )
  }

  onSignupSubmit() {
    this._store.dispatch(
      new actions.SignIn(this.signupForm.value)
    )
  }

}

function signupFormValidator(fg: FormGroup): {[key: string]: boolean} {
  //TODO: check if email is already taken

  //Password match validation
  if (fg.get('password').value !== fg.get('confirmPassword').value)
    return {'passwordmismatch': true}

  return null
}
