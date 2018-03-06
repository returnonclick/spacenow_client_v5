import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'

import { BraintreeService } from './store/services/braintree.service';

import { BraintreeUIComponent } from './components/braintree-ui.component';
import { CardUIDirective } from './directives/card-ui.directive';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  declarations: [
    BraintreeUIComponent,
    CardUIDirective
  ],
  exports: [
    BraintreeUIComponent
  ],
  providers: [
    { provide: BraintreeService, useClass: BraintreeService }
  ]
})
export class BraintreeModule { }
