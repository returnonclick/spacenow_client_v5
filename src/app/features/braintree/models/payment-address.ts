export class PaymentAddress {

  firstName:         string = ""
  lastName:          string = ""
  company:           string = ""
  streetAddress:     string = ""
  extendedAddress:   string = ""
  locality:          string = ""
  region:            string = ""
  postalCode:        string = ""
  countryCodeAlpha2: string = "AU"

  constructor(model: any = null) {
    if(model) {
      this.firstName         = model.firstName         || ""
      this.lastName          = model.lastName          || ""
      this.company           = model.company           || ""
      this.streetAddress     = model.streetAddress     || ""
      this.extendedAddress   = model.extendedAddress   || ""
      this.locality          = model.locality          || ""
      this.region            = model.region            || ""
      this.postalCode        = model.postalCode        || ""
      this.countryCodeAlpha2 = model.countryCodeAlpha2 || "AU"
    }
  }
}
