// E-Way address model
// Ref: https://eway.io/api-v3/?_ga=2.196315820.1081692942.1516852035-565847718.1516852035#transaction-query
/*
 * MODEL NAME
 * Address
 *
 * IMPORTED MODES
 *
 *
 * Path to firebase: `/addresses`
 *
 *  */


export class Address {

  street1:      string = ''       // (50)	An echo of the customer's street address
  street2:      string = ''       // (50)	An echo of the customer's street address
  city:         string = ''       // (50) An echo of the customer's city / town / suburb
  state:        string = ''       // (50) An echo of the customer's state / country
  postalCode:   string = ''       // (30) An echo of the customer's post / zip code
  countryCode:  string = ''       // (02) An echo of the customer's country as the two letter ISO 3166-1 alpha-2 code E.g.: AU, BR, US
  countryName:  string = ''       // (20) An echo of the customer's country name
  lng:          number = 0        // (10) Longtitude to use on GOOGLE API
  lat:          number = 0        // (10) Latitude to use on GOOGLE API

  constructor(model: any = null) {

    if (model) {

      this.street1      = model.street1
      this.street2      = model.street2
      this.city         = model.city
      this.state        = model.state
      this.postalCode   = model.postalCode
      this.countryCode  = model.countryCode
      this.countryName  = model.countryName
      this.lng          = model.lng
      this.lat          = model.lat

    }

  }

}

export default [ Address ]
