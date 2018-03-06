import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { PaymentBooking } from '@features/braintree/models/payment-booking'
import { PaymentCustomer } from '@features/braintree/models/payment-customer'

@Injectable()
export class BraintreeService {

  constructor(private http: HttpClient) { }

  getClientToken(clientTokenURL: string, customerId: string =""): Observable<string> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' })
    return this.http
      .post(clientTokenURL, { customerId: customerId }, { 'headers': headers })
      .map((response: any) => {
        console.log(response)
        return response.token
      })
      .catch((error) => {
        return Observable.throw(error)
      })
  }

  payBooking(createPurchaseURL: string, nonce: string, paymentData: PaymentBooking): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' })
    return this.http
    .post(createPurchaseURL, { nonce: nonce, paymentData: paymentData }, { 'headers': headers })
      .map((response: any) => {
        return response
      })
  }

  createPaymentMethod(requestURL: string, nonce: string, customerId: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' })
    return this.http
    .post(requestURL, { nonce: nonce, customerId: customerId }, { 'headers': headers })
      .map((response: any) => {
        return response
      })
  }

}
