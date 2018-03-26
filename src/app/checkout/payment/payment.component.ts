import { Component, Input, ViewChild } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'

import { User } from '@models/user'
import { Profile } from '@models/profile'
import { Booking, BookingSpace } from '@models/booking'
import { PaymentBooking } from '@app/braintree/models/payment-booking'
import { BraintreeUIComponent } from '@app/braintree/components/braintree-ui.component'

import * as fromRoot from '@core/store'
import * as checkoutActions from '@core/store/checkout/actions/checkout'
import * as profileActions from '@core/store/users-profile/actions/user-profile'

@Component({
  selector: 'sn-payment',
  templateUrl: './payment.component.html',
  styleUrls: [ './payment.component.scss' ]
})
export class PaymentComponent {

  @ViewChild(BraintreeUIComponent) braintreeComponent: BraintreeUIComponent
  @Input() cart:                                       BookingSpace[]
  @Input() customer:                                   User
  @Input() amount:                                     number
  @Input() userNotes:                                  string = ''
  @Input() hostNotes:                                  string = ''

  firestoreBooking: Booking        = new Booking()
  braintreeBooking: PaymentBooking = new PaymentBooking()
  currency:         string         = 'AUD'
  profile:          Profile


  constructor(private _store: Store<fromRoot.State>) {
    this._store.select(fromRoot.getUserProfileEntities).subscribe(profiles => {
      if(this.customer && profiles[this.customer.uid])
        this.profile = new Profile(profiles[this.customer.uid])
      return null
    })
  }

  ngOnInit() {
    this._store.dispatch(new profileActions.Query(this.customer.uid))

    this.prepareFireStore()
    this._store.select(fromRoot.getCheckoutState).subscribe(state => {
      if(!state.isLoading && state.bookingId) {
        this.prepareBraintree(state.bookingId)
        this.braintreeComponent.initiatePayment()
      }
    })
  }

  prepareFireStore() {
    this.firestoreBooking.userId        = this.customer.uid
    this.firestoreBooking.createdOn     = new Date()
    this.firestoreBooking.finalPrice    = this.amount
    this.firestoreBooking.currency      = this.currency
    this.firestoreBooking.paymentStatus = 'pending'
    this.firestoreBooking.spaceBookings = this.cart
    this.firestoreBooking.userNotes     = this.userNotes
    this.firestoreBooking.hostNotes     = this.hostNotes
  }

  prepareBraintree(bookingId: string) {
    this.braintreeBooking.customerID = this.customer.uid
    this.braintreeBooking.bookingID  = bookingId
    this.braintreeBooking.amount     = this.amount
    this.braintreeBooking.currency   = this.currency

    let address = this.profile.contact.addresses[0]
    this.braintreeBooking.billing.firstName         = this.profile.contact.firstName
    this.braintreeBooking.billing.lastName          = this.profile.contact.lastName
    this.braintreeBooking.billing.company           = this.profile.businessProfile.businessName
    this.braintreeBooking.billing.extendedAddress   = address.full_name
    this.braintreeBooking.billing.streetAddress     = address.street_number
    this.braintreeBooking.billing.locality          = address.locality
    this.braintreeBooking.billing.region            = address.administrative_area_level_1
    this.braintreeBooking.billing.postalCode        = address.postal_code
    this.braintreeBooking.billing.countryCodeAlpha2 = address.countryCode

    // this.braintreeBooking.customer.id = "testUserID123456"
    this.braintreeBooking.customer.firstName = this.profile.contact.firstName
    this.braintreeBooking.customer.lastName  = this.profile.contact.lastName
    this.braintreeBooking.customer.company   = this.profile.businessProfile.businessName
    this.braintreeBooking.customer.phone     = this.profile.contact.phone
    this.braintreeBooking.customer.email     = this.profile.contact.email
    this.braintreeBooking.customer.fax       = this.profile.contact.fax
  }

  checkout() {
    this._store.dispatch(new checkoutActions.Checkout(this.firestoreBooking))
  }

}
