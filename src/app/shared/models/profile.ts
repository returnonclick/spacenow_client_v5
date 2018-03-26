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

import { BusinessProfile } from '@shared/models/business-profile'
import { Card } from '@shared/models/card'
import { Contact } from '@shared/models/contact'
import { ImageData } from '@shared/models/image-data'

export class Profile extends Object {

  uid:             string          = ''
  contact:         Contact         = new Contact()
  cards:           Card[]          = []
  businessProfile: BusinessProfile = new BusinessProfile()

  constructor(model: any = null) {
    super()
    if(model) {
      this.uid             = model.uid
      this.contact         = new Contact(model.contact)
      this.cards           = (model.cards || []).map(card => new Card(card))
      this.businessProfile = new BusinessProfile(model.businessProfile)
    }
  }

}
