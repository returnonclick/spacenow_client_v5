import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/map'
import * as dropin from 'braintree-web-drop-in'

import { PaymentBooking } from '../../models/payment-booking'
import { PaymentCustomer } from '../../models/payment-customer'

@Injectable()
export class BraintreeService {

  private _paymentServer    = 'https://glacial-ocean-69657.herokuapp.com/api'
  // private _paymentServer   = 'http://localhost:8080/api'
  private _clientTokenUrl   = `${this._paymentServer}/get-client-token`
  private _payBookingUrl    = `${this._paymentServer}/booking-payment`
  private _addPayMethodUrl  = `${this._paymentServer}/new-payment-method`

  private _numTries: number = 3

  constructor(private http: HttpClient) { }

  getClientToken(customerId: string): Observable<string> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' })

    return this.http.post(
      this._clientTokenUrl,
      { customerId: customerId },
      { 'headers': headers }
    )
    .map((response: any) => response.token)
  }

  requestNonce(instance: any) {
    return Observable.fromPromise(
      instance.requestPaymentMethod()
    ).delay(2000)
  }

  payBooking(
    nonce: string,
    paymentData: PaymentBooking
  ): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' })

    return this.http.post(
      this._payBookingUrl,
      {
        nonce: nonce,
        paymentData: paymentData,
      },
      { headers: headers }
    )//.map(response => response)
  }

  /** NOT USED **/
  createPaymentMethod(
    nonce: string,
    customerId: string
  ): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' })

    return this.http.post(
      this._addPayMethodUrl,
      {
        nonce: nonce,
        customerId: customerId,
      },
      { headers: headers }
    )//.map(response => response)
  }

}
