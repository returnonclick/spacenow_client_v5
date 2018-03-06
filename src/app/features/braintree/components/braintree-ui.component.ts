import { Component, Input, Output, EventEmitter } from '@angular/core'

import * as dropin from 'braintree-web-drop-in'

import { BraintreeService } from '@features/braintree/store/services/braintree.service'
import { PaymentCustomer } from '@features/braintree/models/payment-customer'

@Component({
  selector: 'sn-braintree-ui',
  templateUrl: './braintree-ui.component.html',
  styleUrls: [ './braintree-ui.component.scss' ]
})
export class BraintreeUIComponent {

  // paymentServerDomain = 'http://localhost:8080/api/'
  paymentServerDomain = "https://glacial-ocean-69657.herokuapp.com/api/"

  @Input() clientTokenURL:     string
  @Input() requestType:        string
  @Input() requestData:        any
  // Optional inputs
  @Input() buttonText:         string            = 'Update Card' // to configure the pay button text
  @Input() allowChoose:        boolean           = false
  @Input() showCardholderName: boolean           = false
  @Input() showPaypal:         boolean           = false
  @Input() customerId:         string            = ""

  @Output() outcomeStatus:     EventEmitter<any> = new EventEmitter<any>()

  initDropIn:                  any
  dropInInstance:              any
  clientToken:                 string
  nonce:                       string
  showPayButton:               boolean           = false // to display the pay button only after the dropin UI has rendered (well, almost)
  showDropInUI:                boolean           = true
  clientTokenNotReceived:      boolean           = false // to show the error, "Error! Client token not received."
  errorMessage:                string

  constructor(private service: BraintreeService) { }

  ngOnInit() {
    this.generateDropInUI()
  }

  generateDropInUI() {
    this.service
      .getClientToken(this.clientTokenURL, this.customerId)
      .subscribe((clientToken: string) => {
        if(!clientToken)
          this.clientTokenNotReceived = true
        else {
          this.clientToken            = clientToken
          this.clientTokenNotReceived = false
          this.initDropIn             = setInterval(() => {
            this.createDropin()
          }, 0)
        }
      }, (error) => {
        this.clientTokenNotReceived = true
        console.error(`Client token not received. Please make sure your braintree server api is configured properly, running and accessible.`)
      })
  }

  createDropin() {
    let config: any = {
      authorization: this.clientToken,
      container:     '#dropin-container'
    }

    // showPaypal
    if(this.showPaypal) {
      config.paypal = {
        flow: 'vault'
      }
    }
    // showCardholderName
    if(this.showCardholderName) {
      config.card = {
        cardholderName: {
          required: this.showCardholderName
        }
      }
    }

    dropin.create(config, (createErr, dropInInstance) => {
      if(createErr) {
        console.error(createErr)
        return
      }
      this.dropInInstance = dropInInstance

      // Check whether a saved credit card is avablable
      console.log(this.dropInInstance.isPaymentMethodRequestable())

      // Listen to Dropin UI event
      dropInInstance.on('paymentMethodRequestable', function(event) {
        console.log(event.type)
        console.log(event.paymentMethodIsSelected)
      })
    })
    clearInterval(this.initDropIn)
    this.showPayButton = true
  }

  update(): void {
    if(!this.dropInInstance) {
      return
    }

    this.dropInInstance.requestPaymentMethod((err, payload) => {
      if(err) {
        console.error(err)
        return
      }

      if(!this.allowChoose) { // process immediately after tokenization
        this.nonce        = payload.nonce
        this.showDropInUI = false
        this.confirmUpdate()
      }
      else if(!this.nonce) // dont process immediately. Give user a chance to change his payment details.
        this.nonce = payload.nonce // previous nonce doesn't exist
      else if(this.nonce === payload.nonce) // a nonce exists already
        this.confirmUpdate() // go ahead with payment
      else
        this.nonce = payload.nonce
    })
  }

  confirmUpdate(): void {
    this.showDropInUI = false
    const requestURL  = this.paymentServerDomain + this.requestType

    switch(this.requestType) {
      case 'booking-payment':
        console.log("paying for a booking")
        this.service.payBooking(
          requestURL,
          this.nonce,
          this.requestData
        ).subscribe(status => {
          if(status.errors) {
            this.errorMessage = status.message
            this.showDropInUI = true
            this.generateDropInUI()
          }

          this.outcomeStatus.emit(status)
        })
        break
      case 'new-payment-method':
        this.service.createPaymentMethod(
          requestURL,
          this.nonce,
          this.requestData
        ).subscribe(status => {
          if(status.errors) {
            this.errorMessage = status.message
            this.showDropInUI = true
            this.generateDropInUI()
          }

          this.outcomeStatus.emit(status)
        })
        break
      default:
        this.showDropInUI = true
        break
    }
  }

}
