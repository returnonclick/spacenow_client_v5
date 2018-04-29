export class PaymentCustomer {

  id:        string = ""
  firstName: string = ""
  lastName:  string = ""
  company:   string = ""
  phone:     string = ""
  fax:       string = ""
  website:   string = ""
  email:     string = ""

  constructor(model: any = null) {
    if(model) {
      this.id        = model.id        || ""
      this.firstName = model.firstName || ""
      this.lastName  = model.lastName  || ""
      this.company   = model.company   || ""
      this.phone     = model.phone     || ""
      this.fax       = model.fax       || ""
      this.website   = model.website   || ""
      this.email     = model.email     || ""
    }
  }
}
