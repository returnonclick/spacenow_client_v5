import { Component, Input, ViewChild } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'

import { User } from '@models/user'
import { Profile } from '@models/profile'
import { Booking, PaymentStatus } from '@models/booking'
import { PaymentBooking } from '@app/pages/braintree/models/payment-booking'
import { BraintreeUIComponent } from '@app/pages/braintree/components/braintree-ui.component'

import * as fromRoot from '@core/store'
import * as profileActions from '@core/store/users-profile/actions/user-profile'
import * as bookingActions from '@core/store/bookings/actions/booking'

@Component({
  selector: 'sn-payment',
  templateUrl: './payment.component.html',
  styleUrls: [ './payment.component.scss' ]
})
export class PaymentComponent {

  @ViewChild(BraintreeUIComponent) braintreeComponent: BraintreeUIComponent
  @Input() cart:                                       Booking[]
  @Input() customer:                                   User
  @Input() amount:                                     number
  @Input() userNotes:                                  string = ''
  @Input() hostNotes:                                  string = ''

  firestoreBooking: Booking
  braintreeBooking: PaymentBooking
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
    this._store.select(fromRoot.getBookingsState).subscribe(state => {
      if(state.bookingId) {
        this.prepareBraintree()
        this.braintreeComponent.initiatePayment()
      }
    })
  }

  prepareFireStore() {
    this.firestoreBooking = this.cart[0]
    this.firestoreBooking.userNotes     = this.userNotes
    this.firestoreBooking.hostNotes     = this.hostNotes
    this.firestoreBooking.paymentStatus = PaymentStatus.AUTHORIZED
    this.firestoreBooking.finalPrice    = this.amount
    this.firestoreBooking.currency      = this.currency
  }

  prepareBraintree() {
    this.braintreeBooking = new PaymentBooking()
    this.braintreeBooking.customerID = this.customer.uid
    this.braintreeBooking.bookingID  = this.firestoreBooking.id
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

    this.braintreeBooking.customer.firstName = this.profile.contact.firstName
    this.braintreeBooking.customer.lastName  = this.profile.contact.lastName
    this.braintreeBooking.customer.company   = this.profile.businessProfile.businessName
    this.braintreeBooking.customer.phone     = this.profile.contact.phone
    this.braintreeBooking.customer.email     = this.profile.contact.email
    this.braintreeBooking.customer.fax       = this.profile.contact.fax
  }

  checkout() {
    this._store.dispatch(new bookingActions.Checkout(this.firestoreBooking))
  }

}
