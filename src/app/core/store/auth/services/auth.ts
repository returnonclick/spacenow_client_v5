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
import { UserData } from '@shared/models/user-data'
import { UserProfile } from '@shared/models/user-profile'
import { Contact } from '@shared/models/contact'

@Injectable()
export class AuthService {

  user: Observable<User | null>;

  constructor(
    public afAuth: AngularFireAuth,
    private _afs: AngularFirestore,
    private router: Router
  ) {}

  getUser(id) {
     return this._afs.collection(`users`).doc(`${id}`).valueChanges()
  }

  signIn(username, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(username, password).then(
      (auth) => this.updateUserData(auth)
    )
  }

  signInWithProvider(provider) {
    return this.afAuth.auth.signInWithPopup(provider).then(
      (auth) => this.updateUserData(auth.user, auth.credential)
    )
  }

  signUp(username, password) {
    return this.afAuth.auth.createUserWithEmailAndPassword(username, password).then(
      (auth) => this.updateUserData(auth)
    )
  }

  sendEmailVerification() {
    var user = firebase.auth().currentUser
    user.sendEmailVerification()
  }

  signOut() {
    this.afAuth.auth.signOut()
  }

  private updateUserData(auth: any, credential?: any) {

    const userRef: AngularFirestoreDocument<User> = this._afs.collection<User>(`users`).doc(`${auth.uid}`)
    const userProfileRef: AngularFirestoreDocument<UserProfile> = this._afs.collection<UserProfile>(`users-profile`).doc(`${auth.uid}`)

    let userData = new UserData()
    userData.displayName  = auth.providerData[0].displayName ? auth.providerData[0].displayName : auth.providerData[0].email
    userData.email        = auth.providerData[0].email
    userData.phoneNumber  = auth.providerData[0].phoneNumber
    userData.photoURL     = auth.providerData[0].photoURL ? auth.providerData[0].photoURL : 'https://pickaface.net/assets/images/slides/slide2.png'
    userData.providerId   = auth.providerData[0].providerId
    userData.uid          = auth.providerData[0].uid

    let data: User = new User()
    data.uid           = auth.uid
    data.email         = auth.email
    data.displayName   = auth.displayName ? auth.displayName : auth.email
    data.phoneNumber   = auth.phoneNumber
    data.photoURL      = auth.photoURL ? auth.photoURL : 'https://pickaface.net/assets/images/slides/slide2.png'
    data.isVerified    = auth.emailVerified
    data.idToken       = credential ? credential.idToken : null
    data.userData.push(userData);

    const contact: Contact = new Contact()
    let userProfile: UserProfile = new UserProfile()
    userProfile.userUID = data.uid
    userProfile.contact = contact

    userRef.set(Object.assign({}, data))
    userProfileRef.set(Object.assign({}, userProfile))
    return Promise.resolve(data)
  }

}
