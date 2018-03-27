/*
 * MODEL NAME
 * ProfileModel
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

import { BankAccount } from '@models/bank-account'
import { BusinessProfile } from '@shared/models/business-profile'
import { Card } from '@shared/models/card'
import { Contact } from '@shared/models/contact'
import { ImageData } from '@shared/models/image-data'

export class Profile {

  uid:             string          = ''
  aboutMe:         string          = ''
  bankAccounts:    BankAccount[]   = []
  businessProfile: BusinessProfile = null
  cards:           Card[]          = []
  contact:         Contact         = null
  coverUrl:        ImageData       = null

  constructor(model: any = null) {
    if(model) {
      this.uid             = model.uid
      this.aboutMe         = model.aboutMe
      this.bankAccounts    = (model.bankAccounts || []).map(account => new BankAccount(account))
      this.businessProfile = new BusinessProfile(model.businessProfile)
      this.cards           = (model.cards || []).map(card => new Card(card))
      this.contact         = new Contact(model.contact)
      this.coverUrl        = new ImageData(model.coverUrl)
    }
  }

}
