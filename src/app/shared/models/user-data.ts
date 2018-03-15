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

export class UserData extends Object{
  displayName:  string = null
  email:        string = null
  phoneNumber:  string = null
  photoURL:     string = "https://pickaface.net/assets/images/slides/slide2.png"
  providerId:   string = null // social account provider e.g. Facebook, Google+
  uid:          string = null // user ID associated with social account

  constructor( model: any = null ){

    super()

    if ( model ) {
  
      this.displayName  = model.displayName ? model.displayName : model.email
      this.email        = model.email
      this.phoneNumber  = model.phoneNumber
      this.photoURL     = model.photoURL || "https://pickaface.net/assets/images/slides/slide2.png"
      this.providerId   = model.providerId
      this.uid          = model.uid
    
    }
  
  }

}

export default [ UserData ]