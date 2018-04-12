import { Injectable } from '@angular/core'
import { Store } from '@ngrx/store'
import { AngularFireAuth } from 'angularfire2/auth'
import { AngularFirestore } from 'angularfire2/firestore'

import * as firebase from 'firebase/app'

import { User } from '@models/user'
import { Profile } from '@models/profile'
import { Contact } from '@models/contact'

import * as fromRoot from '@core/store'
import * as actions from '@core/store/auth/actions/auth'

@Injectable()
export class AuthService {

  constructor(
    private _store: Store<fromRoot.State>,
    public afAuth:  AngularFireAuth,
    private _afs:   AngularFirestore,
  ) {
    this.afAuth.authState.subscribe(user => {
      if(user)
        this._store.dispatch(new actions.GetUser)
    })
  }

  getUser(id) {
    return this._afs.doc(`/users/${id}`).ref.get()
  }

  signIn(username, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(username, password)
  }

  signInWithProvider(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then(data => this.updateUserData(data.user))
  }

  signUp(username, password) {
    return this.afAuth.auth.createUserWithEmailAndPassword(username, password)
      .then(data => this.updateUserData(data))
  }

  sendEmailVerification() {
    var user = firebase.auth().currentUser
    user.sendEmailVerification()
  }

  sendPasswordResetEmail(email) {
    return firebase.auth().sendPasswordResetEmail(email)
  }

  signOut() {
    return this.afAuth.auth.signOut()
  }

  private updateUserData(auth: any, credential?: any) {
    const userRef        = this._afs.collection<User>(`users`).doc(`${auth.uid}`)
    const userProfileRef = this._afs.collection<Profile>(`users-profile`).doc(`${auth.uid}`)
    const data          = new User(auth)
    const contact       = new Contact()
    let userProfile     = new Profile()
    userProfile.uid     = data.uid
    userProfile.contact = contact

    userRef.set(Object.assign({ }, data))
    userProfileRef.set(Object.assign({ }, userProfile))
  }

}
