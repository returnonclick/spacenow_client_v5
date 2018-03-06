import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BraintreeService } from '@features/braintree/store/services/braintree.service';
declare var braintree: any;

import { PaymentCustomer } from '@features/braintree/models/payment-customer'

@Component({
  selector: 'sn-braintree-ui',
  templateUrl: './braintree-ui.component.html',
  styleUrls: [ './braintree-ui.component.scss' ]
})
export class BraintreeUIComponent {

  // paymentServerDomain = 'http://localhost:8080/api/'
  paymentServerDomain = "https://glacial-ocean-69657.herokuapp.com/api/"

  @Input() clientTokenURL: string
  @Input() requestType:    string
  @Input() requestData:    any
  // Optional inputs
  @Input() buttonText:         string  = 'Update Card' // to configure the pay button text
  @Input() allowChoose:        boolean = false
  @Input() showCardholderName: boolean = false
  @Input() showPaypal:         boolean = false
  @Input() customerId:         string  = ""

  @Output() outcomeStatus: EventEmitter<any> = new EventEmitter<any>()

  clientToken: string
  nonce: string
  showDropinUI = true
  errorMessage: string

  showPayButton = false // to display the pay button only after the dropin UI has rendered (well, almost)
  clientTokenNotReceived = false // to show the error, "Error! Client token not received."
  interval: any
  instance: any

  constructor(private service: BraintreeService) { }

  ngOnInit() {
    this.generateDropInUI()
  }

  generateDropInUI() {
    this.service
      .getClientToken(this.clientTokenURL, this.customerId)
      .subscribe((clientToken: string) => {
        if (!clientToken) {
          this.clientTokenNotReceived = true
        } else {
          this.clientToken = clientToken
          this.clientTokenNotReceived = false
          this.interval = setInterval(() => { this.createDropin() }, 0)
        }
      }, (error) => {
        this.clientTokenNotReceived = true
        console.error(`Client token not received.
        Please make sure your braintree server api is configured properly, running and accessible.`)
      })
  }

  createDropin() {
    var dropinConfig: any = {}

    dropinConfig.authorization = this.clientToken
    dropinConfig.container = '#dropin-container'

    // showPaypal
    if(this.showPaypal) {
      dropinConfig.paypal = {
        flow: 'vault'
      }
    }
    // showCardholderName
    if (this.showCardholderName) {
      dropinConfig.card = {
        cardholderName: {
          required: this.showCardholderName
        }
      }
    }

    if (typeof braintree !== 'undefined') {
      braintree.dropin.create(dropinConfig, (createErr, instance) => {
        if (createErr) {
          console.error(createErr)
          return
        }
        this.instance = instance

        // Check whether a saved credit card is avablable
        console.log(this.instance.isPaymentMethodRequestable())

        // Listen to Dropin UI event
        instance.on('paymentMethodRequestable', function(event){
          console.log(event.type)
          console.log(event.paymentMethodIsSelected)
        })

      })
      clearInterval(this.interval)
      this.showPayButton = true
    }


  }

  update(): void {
    if (this.instance) {
      this.instance.requestPaymentMethod((err, payload) => {
        if (err) {
          console.error(err)
          return
        }
        if (!this.allowChoose) { // process immediately after tokenization
          this.nonce = payload.nonce
          this.showDropinUI = false
          this.confirmUpdate()
        } else { // dont process immediately. Give user a chance to change his payment details.
          if (!this.nonce) { // previous nonce doesn't exist
            this.nonce = payload.nonce
          } else { // a nonce exists already
            if (this.nonce === payload.nonce) { // go ahead with payment
              this.confirmUpdate()
            } else {
              this.nonce = payload.nonce
            }
          }
        }
      })
    }
  }

  confirmUpdate(): void {
    this.showDropinUI = false
    const requestURL = this.paymentServerDomain + this.requestType
    console.log(this.requestType)
    switch (this.requestType) {
      case 'booking-payment':
        console.log("paying for a booking")
        this.showDropinUI = false
        this.service
          .payBooking(requestURL, this.nonce, this.requestData)
          .subscribe((status: any) => {
            if (status.errors) {
              this.errorMessage = status.message
              this.showDropinUI = true
              this.generateDropInUI()
            }
            this.outcomeStatus.emit(status)
        })
        break
      case 'new-payment-method':
        this.showDropinUI = false
        this.service
          .createPaymentMethod(requestURL, this.nonce, this.requestData)
          .subscribe((status: any) => {
            if (status.errors) {
              this.errorMessage = status.message
              this.showDropinUI = true
              this.generateDropInUI()
            }

            this.outcomeStatus.emit(status)
          })
        break
      default:
        this.showDropinUI = true
        break
    }
  }

}
