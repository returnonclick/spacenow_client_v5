import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { MatButtonModule, MatProgressSpinnerModule } from '@angular/material'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'

import { BraintreeService } from './store/services/braintree'
import { BraintreeEffects } from './store/effects/braintree'

import { reducer, stateIdent } from './store/reducers/braintree'

import { BraintreeUIComponent } from './components/braintree-ui.component'

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    StoreModule.forFeature(stateIdent, reducer),
    EffectsModule.forFeature([
      BraintreeEffects,
    ]),
  ],
  declarations: [
    BraintreeUIComponent,
  ],
  exports: [
    BraintreeUIComponent,
  ],
  providers: [
    BraintreeService,
  ]
})
export class BraintreeModule { }