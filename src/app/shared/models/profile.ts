/* 
 * MODEL NAME
 * ProfileModel
 * 
 * IMPORTED MODES
 * Card, Contact, ImageData
 * 
 * Path to firebase: `/user-profiles/{$userUID}`
 * 
 * #### SIZES
 * Original, Fullwidth, Halfwidth, Thumbnail
 * IMAGE_SIZE.JPG = `original.jpg` | `fullsize.jpg` | `halfsize.jpg` | `thumbnail.jpg`
 *
 * ### FIREBASE STORAGE PATH:
 * `/images/users-profiles/{$usersProfileID}/{$imageID}/{IMAGE_SIZE.JPG}`
 * 
 * */

import { Card } from '@shared/models/card'
import { Contact } from '@shared/models/contact'
import { ImageData } from '@shared/models/image-data'

export class Profile extends Object {

  userUID:      string    = ''          
  contact:      Contact   = new Contact()
  cards:        Card[]    = new Array()
  DOB:          Date      = null
  coverUrl:     ImageData = new ImageData()

  constructor( model: any = null ) {

    super(model)

    if ( model ) {

      this.userUID  = model.userUID
      this.contact  = model.contact
      this.cards    = model.cards
      this.DOB      = model.DOB
      this.coverUrl = model.coverUrl
    
    }

  }

}