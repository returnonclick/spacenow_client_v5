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

import { UserData } from "@shared/models/user-data";
import * as firebase from 'firebase/app';

export class User {
  userUID: string = null;
  userData: Array<UserData> = new Array();
  isVerified: boolean = false;
  idToken?: string;
  roles: any[];

  constructor(model: any = null) {
    if (model) {
      this.userData.push(new UserData(model))
      this.userUID = model.userUID || model.uid
    }
  }
}

export default [ User ]