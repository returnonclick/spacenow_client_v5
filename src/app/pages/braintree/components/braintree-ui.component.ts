import { Component, Input, Output, EventEmitter } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable, Subject } from 'rxjs'
import 'rxjs/add/operator/takeUntil'

import * as dropin from 'braintree-web-drop-in'

import * as fromBraintree from '../store/reducers/braintree'
import * as braintreeActions from '../store/actions/braintree'

@Component({
  selector: 'sn-braintree-ui',
  templateUrl: './braintree-ui.component.html',
  styleUrls: [ './braintree-ui.component.scss' ]
})
export class BraintreeUIComponent {

  @Input() requestData:        any
  @Input() customerId:         string
  @Input() buttonText:         string              = 'Pay Now'
  @Input() isCardNameRequired: boolean             = true
  @Input() showPaypal:         boolean             = true
  @Input() redirectUrl:        string              = ''

  dropInInstance:              any
  clientToken:                 string              = null
  requestType:                 string              = 'booking-payment'
  config:                      any

  clientToken$:                Observable<string>
  error$:                      Observable<any>
  isLoading$:                  Observable<boolean>

  constructor(
    private _store: Store<fromBraintree.State>
  ) {
    this.clientToken$ = this._store.select(fromBraintree.getClientToken)
    this.error$       = this._store.select(fromBraintree.getError)
    this.isLoading$   = this._store.select(fromBraintree.isLoading)

    this.clientToken$.subscribe(token => {
      if(token) {
        this.clientToken = token
        this.config      = {
          authorization: this.clientToken,
          container:     '#dropin',
          card: {
            cardholderName: {
              required: this.isCardNameRequired
            }
          }
        }
        if(this.showPaypal) {
          this.config.paypal = {
            flow: 'vault'
          }
        }

        this.createDropIn()
      }
    })
  }

  ngOnInit() {
    this._store.dispatch(new braintreeActions.GetClientToken(this.customerId))
  }

  createDropIn() {
    dropin.create(this.config).then(dropInInstance => {
      this.dropInInstance = dropInInstance
    }).catch(createErr => {
      console.error(createErr)
      this.createDropIn() // retry
    })
  }

  initiatePayment(): void {
    if(!this.dropInInstance)
      return

    let stopper = new Subject()
    this._store.select(fromBraintree.getNonce)
    .takeUntil(stopper)
    .subscribe(nonce => {
      if(nonce) {
        this._store.dispatch(new braintreeActions.Pay(nonce, this.requestData, this.redirectUrl))
        stopper.next()
        stopper.complete()
      }
    })
    this._store.dispatch(new braintreeActions.RequestNonce(this.dropInInstance))
  }

}
