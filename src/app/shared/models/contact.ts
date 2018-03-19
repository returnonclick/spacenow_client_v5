// Based on E-Way contact model

import { Address } from '@shared/models/address';

export class Contact extends Object{
  
  title:          string          = ''                // (5)  The customer's title empty string allowed
  firstName:      string          = ''                // (50) The user's first name
  lastName:       string          = ''                // (50) The user's last name
  gender:         string          = ''                // (50) The user's gender Male, Female, Other
  dob:            Date            = null              // The user's date of birthday
  mobile:         string          = ''                // (32) The customer's mobile phone number
  phone:          string          = ''                // (32) The customer's phone number
  fax:            string          = ''                // (32) The customer's fax number
  email:          string          = ''                // (50) The customer's email address, which must be correctly formatted if present
  addresses:      Array<Address>  = new Array()       // The imported object from AddressModel

  constructor( model: any = null ) {

    super()

    if ( model ) {

      this.title      = model.title
      this.firstName  = model.firstName
      this.lastName   = model.lastName
      this.gender     = model.gender
      this.dob        = model.dob
      this.mobile     = model.mobile
      this.phone      = model.phone
      this.fax        = model.fax
      this.email      = model.email
      this.addresses  = model.addresses

    }

  }

}

export default [ Contact ]