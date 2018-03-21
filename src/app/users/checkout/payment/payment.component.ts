import { Component, Input, ViewChild } from '@angular/core'
import { Store } from '@ngrx/store'

import { Booking, BookingSpace } from '@models/booking'
import { PaymentBooking } from '@app/braintree/models/payment-booking'
import { BraintreeUIComponent } from '@app/braintree/components/braintree-ui.component'

import * as fromRoot from '@core/store'
import * as checkoutActions from '@core/store/checkout/actions/checkout'

@Component({
  selector: 'sn-payment',
  templateUrl: './payment.component.html',
  styleUrls: [ './payment.component.scss' ]
})
export class PaymentComponent {

  @ViewChild(BraintreeUIComponent) braintreeComponent: BraintreeUIComponent
  @Input() cart:                              BookingSpace[]
  @Input() customerId:                        string

  firestoreBooking: Booking        = new Booking()
  braintreeBooking: PaymentBooking = new PaymentBooking()

  amount:           number         = 11211
  currency:         string         = 'USD'

  constructor(private _store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.prepareFireStore()
    this._store.select(fromRoot.getCheckoutState).subscribe(state => {
      if(!state.isLoading && state.bookingId) {
        this.prepareBraintree(state.bookingId)
        this.braintreeComponent.initiatePayment()
      }
    })
  }

  prepareFireStore() {
    this.firestoreBooking.userId        = this.customerId
    this.firestoreBooking.createdOn     = new Date()
    this.firestoreBooking.finalPrice    = this.amount
    this.firestoreBooking.currency      = this.currency
    this.firestoreBooking.paymentStatus = 'PAID'
    this.firestoreBooking.spaceBookings = this.cart
  }

  prepareBraintree(bookingId: string) {
    this.braintreeBooking.customerID = this.customerId
    this.braintreeBooking.bookingID  = bookingId
    // this.braintreeBooking.spaceID    = "test-space123456"
    this.braintreeBooking.amount     = this.amount
    this.braintreeBooking.currency   = this.currency

    // this.braintreeBooking.customer.id = "testUserID123456"
    this.braintreeBooking.billing.firstName         = "Billy"
    this.braintreeBooking.billing.lastName          = "Shorten"
    this.braintreeBooking.billing.company           = "CON Pty Ltd"
    this.braintreeBooking.billing.extendedAddress   = "Unit 123 Nice Building"
    this.braintreeBooking.billing.streetAddress     = "100 Bourke Rd"
    this.braintreeBooking.billing.locality          = "Alexandria"
    this.braintreeBooking.billing.region            = "NSW"
    this.braintreeBooking.billing.postalCode        = "2015"
    this.braintreeBooking.billing.countryCodeAlpha2 = "AU"

    this.braintreeBooking.customer.firstName = "Bill"
    this.braintreeBooking.customer.lastName  = "Shorten"
    this.braintreeBooking.customer.company   = "CON Pty Ltd"
    this.braintreeBooking.customer.phone     = "0123456789"
    this.braintreeBooking.customer.website   = "wwww.fakesite.com"
    this.braintreeBooking.customer.email     = "bill.shorten@conmen.com"
    this.braintreeBooking.customer.fax       = "0001112223333"
  }

  checkout() {
    this._store.dispatch(new checkoutActions.Checkout(this.firestoreBooking))
  }

}
