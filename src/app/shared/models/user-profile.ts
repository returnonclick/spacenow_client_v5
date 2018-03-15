/* 
 * MODEL NAME
 * UserProfile
 * 
 * IMPORTED MODES
 * Card, Contact, ImageData
 * 
 * Path to firebase: `/user-profiles/{$uid}`
 * 
 * #### SIZES
 * Original, Fullwidth, Halfwidth, Thumbnail
 * IMAGE_SIZE.JPG = `original.jpg` | `fullsize.jpg` | `halfsize.jpg` | `thumbnail.jpg`
 *
 * ### FIREBASE STORAGE PATH:
 * `/images/users-profiles/{$usersProfileID}/{$imageID}/{IMAGE_SIZE.JPG}`
 * 
 * */

import { BankAccount } from "@shared/models/bank-account";
import { BusinessProfile } from "@shared/models/business-profile";
import { Card } from "@shared/models/card";
import { Contact } from "@shared/models/contact";
import { ImageData } from "@shared/models/image-data";

export class UserProfile extends Object{

  uid:                string                    = null
  bankAccounts:       Array<BankAccount>        = new Array()
  cards:              Array<Card>               = new Array()
  contact:            Contact                   = new Contact()
  coverUrl:           ImageData                 = new ImageData()

  constructor( model: any = null ) {

    super()

    if ( model ) {

      this.uid              = model.uid
      this.bankAccounts     = model.bankAccounts
      this.cards            = model.cards
      this.contact          = model.contact
      this.coverUrl         = model.coverUrl
    
    }

  }

}
export default [ UserProfile ]