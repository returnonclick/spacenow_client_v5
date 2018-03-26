/*
 * #### NAME
 * BusinessProfile
 *
 * #### DESCRIPTION
 * If the user has a business account to register hsi business
 * the information can be set u accordingly to the fields bellow
 * as an example take Facebook Fan Pages
 *
 * #### RELATED MODELS
 * - Contact
 * - ImageData
 * - Address
 *
 * ### FIREBASE PATH:
 * - `/business-profiles/{$businessProfileID}`
 *
 * #### SIZES
 * Original, Fullwidth, Halfwidth, Thumbnail
 * IMAGE_SIZE.JPG = `original.jpg` | `fullsize.jpg` | `halfsize.jpg` | `thumbnail.jpg`
 *
 * ### FIREBASE STORAGE PATH:
 * `/images/business-profiles/{$businessProfileID}/{$imageID}/{IMAGE_SIZE.JPG}`
 *
 */

import { Contact } from "@models/contact"
import { ImageData } from "@models/image-data"
import { Address } from "@models/address"

export class BusinessProfile extends Object {

  businessProfilesID:   string           = ""
  uid:                  string           = ""               // connect to user who represents the business.

  businessName:         string           = ""
  registeredCountry:    string           = ""               // country where business is registered.
  registerNumber:       string           = ""               // E.g. ABN in Australia

  repContact:           Contact          = new Contact()    // Representative contact
  repTitle:             string           = ""               // E.g. Sale manager
  logoImage:            ImageData        = new ImageData()  // logo image data
  siteURL:              string           = ""               // website address
  address:              Address          = new Address()    // Head Office address

  imageData:            Array<ImageData> = new Array()      // Image data to show in business page
  businessProfileTitle: string           = ""               // Title to display on business page
  description:          string           = ""               // business introduction to display on business page

  constructor(model: any = null) {
    super()
    if (model) {
      this.businessProfilesID   = model.businessProfilesID
      this.uid                  = model.uid
      this.businessName         = model.businessName
      this.registeredCountry    = model.registeredCountry
      this.registerNumber       = model.registerNumber
      this.repContact           = model.repContact
      this.repTitle             = model.repTitle
      this.logoImage            = model.logoImage
      this.siteURL              = model.siteURL
      this.address              = model.address
      this.imageData            = model.imageData
      this.businessProfileTitle = model.businessProfileTitle
      this.description          = model.description
    }
  }

}
