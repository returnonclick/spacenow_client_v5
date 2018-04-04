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

import * as fromRoot from '@core/store'
import { User } from '@shared/models/user'
import { UserData } from '@shared/models/user-data'
import { Profile } from '@shared/models/profile'
import { Contact } from '@shared/models/contact'

@Injectable()
export class AuthService {

  user: Observable<User | null>;

  constructor(
    private _store: Store<fromRoot.State>,
    public afAuth: AngularFireAuth,
    private _afs: AngularFirestore,
    private router: Router
  ) {

    this.afAuth.authState.subscribe(
      (user) => {
        if (user)
          this._store.dispatch(new actions.GetUser)
      }
    )
    
  }

  getUser(id) {
     return this._afs.collection(`users`, ref => ref.where(`uid`, "==", `${id}`)).stateChanges()
  }

  signIn(username, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(username, password)
  }

  signInWithProvider(provider) {
    return this.afAuth.auth.signInWithPopup(provider).then(
      data => this.updateUserData(data.user)
    )
  }

  signUp(username, password) {
    return this.afAuth.auth.createUserWithEmailAndPassword(username, password).then(
      data =>  this.updateUserData(data) 
    )
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

    const userRef: AngularFirestoreDocument<User> = this._afs.collection<User>(`users`).doc(`${auth.uid}`)
    const userProfileRef: AngularFirestoreDocument<Profile> = this._afs.collection<Profile>(`users-profile`).doc(`${auth.uid}`)
     
    const data: User = new User(auth)
    const contact: Contact = new Contact()
    let userProfile: Profile = new Profile()
    userProfile.uid = data.uid
    userProfile.contact = contact

    userRef.set(Object.assign({}, data))
    userProfileRef.set(Object.assign({}, userProfile))

  }

}
