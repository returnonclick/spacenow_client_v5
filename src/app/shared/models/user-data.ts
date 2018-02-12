/* 
 * 
 * PARENT MODEL
 * User
 * 
 * UserData used to cast social account data
 * when user register/login with social accounts
 * i.e. Facebook, Google+, LinkedIn
 *  */

import * as firebase from 'firebase/app';

export class UserData {
  uid: string = "" // user ID associated with social account
  provider: string = "unknown" // social account provider e.g. Facebook, Google+
  email: string = "notprovided@example.com"
  photoURL: string = "https://pickaface.net/assets/images/slides/slide2.png"
  displayName: string = "not provided"

  constructor( model: any = null ){
    this.uid = model.uid
    this.provider = model.providerId
    this.email = model.email
    this.photoURL = model.photoURL ? model.photoURL : 'https://pickaface.net/assets/images/slides/slide2.png'
    this.displayName = model.displayName ? model.displayName : this.email
  }
}

export default [ UserData ]