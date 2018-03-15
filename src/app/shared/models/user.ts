/* 
 * MODEL NAME
 * User
 * 
 * IMPORTED MODELS
 * UserData
 * 
 * Path to firebase: `/users/{$uid}`
 * 
 *  */

import { UserData } from "@shared/models/user-data"
import * as firebase from 'firebase/app'

export class User extends Object {

  uid:          string          = null
  email:        string          = null
  displayName:  string          = null
  phoneNumber:  string          = null
  photoURL:     string          = null
  userData:     Array<UserData> = new Array()
  isVerified:   boolean         = false
  roles:        any[]

  constructor(model: any = null) {

    super()

    if (model) {

      this.userData.push(new UserData(model.providerData[0]))
      this.uid           = model.uid
      this.email         = model.email
      this.displayName   = model.displayName ? model.displayName : model.email
      this.phoneNumber   = model.phoneNumber
      this.photoURL      = model.photoURL || 'https://pickaface.net/assets/images/slides/slide2.png'
      this.isVerified    = model.emailVerified
    }
    
  }
  
}

export default [ User ]