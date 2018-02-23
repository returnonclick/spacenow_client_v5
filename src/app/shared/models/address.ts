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


export class Address extends Object{

  unit_number:                  string = ''       // (50)	An echo of the customer's unit number
  street_number:                string = ''       // (50)	An echo of the customer's street number
  route:                        string = ''       // (50)	An echo of the customer's street address
  locality:                     string = ''       // (50) An echo of the customer's city / town / suburb
  administrative_area_level_1:  string = ''       // (50) An echo of the customer's state / country
  postal_code:                  string = ''       // (30) An echo of the customer's post / zip code
  countryCode:                  string = ''       // (02) An echo of the customer's country as the two letter ISO 3166-1 alpha-2 code E.g.: AU, BR, US
  country:                      string = ''       // (20) An echo of the customer's country name
  lng:                          number = 0        // (10) Longtitude to use on GOOGLE API
  lat:                          number = 0        // (10) Latitude to use on GOOGLE API

  constructor(model: any = null) {
    super(model)

    if (model) {

      this.unit_number        = model.unit_number || ''
      this.street_number      = model.street_number || 0
      this.route              = model.route || ''
      this.locality           = model.locality || ''
      this.administrative_area_level_1   = model.administrative_area_level_1 || ''
      this.postal_code        = model.postal_code || ''
      this.countryCode        = model.countryCode || ''
      this.country            = model.country || ''
      this.lng                = model.lng || 0
      this.lat                = model.lat || 0

    }

  }

}

export default [ Address ]
