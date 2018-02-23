/* 
 * MODEL NAME
 * User
 * 
 * IMPORTED MODELS
 * UserData
 * 
 * Path to firebase: `/users/{$userUID}`
 * 
 *  */

import { UserData } from "@shared/models/user-data"
import * as firebase from 'firebase/app'

export class User extends Object{
  uid:          string          = null
  email:        string          = null
  displayName:  string          = null
  phoneNumber:  string          = null
  photoURL:     string          = 'https://pickaface.net/assets/images/slides/slide2.png'
  userData:     Array<UserData> = new Array()
  isVerified:   boolean         = false
  idToken:      string          = null
  roles:        any[]

  constructor(model: any = null) {

    super(model)

    if (model) {
      this.uid           = model.uid
      this.email         = model.email
      this.displayName   = model.displayName ? model.displayName : model.email
      this.phoneNumber   = model.phoneNumber
      this.photoURL      = model.photoURL
      this.isVerified    = model.isVerified
      this.idToken       = model.idToken
    }
  }
}

export default [ User ]