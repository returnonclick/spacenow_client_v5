import { Component } from '@angular/core'

import { PaymentBooking } from '@features/braintree/models/payment-booking'

@Component({
  selector: 'sn-payment',
  templateUrl: './payment.component.html',
  styleUrls: [ './payment.component.scss' ]
})
export class PaymentComponent {

  paymentServerDomain = "https://glacial-ocean-69657.herokuapp.com/api"
  clientTokenURL      = this.paymentServerDomain + '/get-client-token'
  createCustomerURL   = this.paymentServerDomain + '/new-customer' // used by the host to input his card so spacenow can pay him

  customerId:         string         = "userUID12345678"
  requestData:        PaymentBooking = new PaymentBooking()

  constructor() {
    this.requestData.customerID = "test-customer123456"
    this.requestData.bookingID  = "test-booking123456"
    this.requestData.spaceID    = "test-space123456"
    this.requestData.amount     = 1000
    this.requestData.currency   = "USD"

    // this.requestData.customer.id = "testUserID123456"
    this.requestData.billing.firstName         = "Billy"
    this.requestData.billing.lastName          = "Shorten"
    this.requestData.billing.company           = "CON Pty Ltd"
    this.requestData.billing.extendedAddress   = "Unit 123 Nice Building"
    this.requestData.billing.streetAddress     = "100 Bourke Rd"
    this.requestData.billing.locality          = "Alexandria"
    this.requestData.billing.region            = "NSW"
    this.requestData.billing.postalCode        = "2015"
    this.requestData.billing.countryCodeAlpha2 = "AU"

    this.requestData.customer.firstName = "Bill"
    this.requestData.customer.lastName  = "Shorten"
    this.requestData.customer.company   = "CON Pty Ltd"
    this.requestData.customer.phone     = "0123456789"
    this.requestData.customer.website   = "wwww.fakesite.com"
    this.requestData.customer.email     = "bill.shorten@conmen.com"
    this.requestData.customer.fax       = "0001112223333"
  }

}
