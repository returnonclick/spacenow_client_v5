import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { of } from 'rxjs/observable/of'
import * as firebase from 'firebase/app'
import { AngularFireAuth } from 'angularfire2/auth'
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore'

import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/switchMap'

import { Store, State } from '@ngrx/store'
import * as actions from '@core/store/auth/actions/auth'

import { User } from '@shared/models/user'
import { UserProfile } from '@shared/models/user-profile'
import { Contact } from '@shared/models/contact'

@Injectable()
export class AuthService {

  constructor(
    public afAuth: AngularFireAuth,
    private _afs: AngularFirestore,
    private router: Router
  ) {}

  getUser(id) {
     return this._afs.collection(`users`).doc(`${id}`).valueChanges()
  }

  signIn(username, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(username, password)
  }

  signOut() {
    this.afAuth.auth.signOut()
  }

  private updateUserData(user, data?) {
    const userRef: AngularFirestoreDocument<User> = this._afs.collection<User>(`users`).doc(`${user.uid}`)
    const userProfileRef: AngularFirestoreDocument<Contact> = this._afs.collection<UserProfile>(`users-profile`).doc(`${user.uid}`)

    const u: User = new User(user)
    const contact: Contact = new Contact(data)
    const userProfile: UserProfile = new UserProfile()
    userProfile.userUID = user.uid
    userProfile.contact = contact

    userRef.set(JSON.parse(JSON.stringify(u)))
    userProfileRef.set(JSON.parse(JSON.stringify(userProfile)))
  }

}
