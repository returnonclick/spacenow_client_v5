import { PaymentAddress } from './payment-address'
import { PaymentCustomer } from './payment-customer'

export class PaymentBooking {

  customerID: string          = "" // should be the same as userUID
  bookingID:  string          = ""
  spaceID:    string          = ""
  amount:     number          = 0
  currency:   string          = "AUD"
  billing:    PaymentAddress  = new PaymentAddress()
  customer:   PaymentCustomer = new PaymentCustomer()

  constructor(model: any = null) {
    if(model) {
      this.customerID = model.customerID                    || "" // should be the same as userUID
      this.bookingID  = model.bookingID                     || ""
      this.spaceID    = model.spaceID                       || ""
      this.amount     = model.amount                        || 0
      this.currency   = model.currency                      || "AUD"
      this.billing    = new PaymentAddress(model.billing)   || new PaymentAddress()
      this.customer   = new PaymentCustomer(model.customer) || new PaymentCustomer()
    }
  }
}
