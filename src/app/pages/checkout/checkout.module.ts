import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from '@angular/router'
import { BraintreeModule } from '@app/pages/braintree/braintree.module'
import { MaterialModule } from '@app/shared/material.module'
import { CheckoutComponent } from './checkout.component'
import { PaymentComponent } from './payment/payment.component'

const routes: Routes = [
  {
      "path": "",
      "component": CheckoutComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    BraintreeModule
  ],
  exports: [
    RouterModule
  ],
  declarations: [
    CheckoutComponent, 
    PaymentComponent
  ]
})
export class CheckoutModule { }

