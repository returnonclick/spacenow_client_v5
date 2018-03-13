import { CoreModule } from '@core/core.module'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FlexLayoutModule } from '@angular/flex-layout'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'

import { AgmCoreModule } from '@agm/core'

import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'

import { SharedModule } from '@shared/shared.module'

import { AngularFireDatabaseModule } from 'angularfire2/database'
import { AngularFireAuthModule } from 'angularfire2/auth'
import { AngularFirestoreModule } from 'angularfire2/firestore'

import { CategoryService } from '@core/store/categories/services/category'
import { CategoryEffects } from '@core/store/categories/effects/category'

import { CheckoutService } from '@core/store/checkout/services/checkout'
import { CheckoutEffects } from '@core/store/checkout/effects/checkout'

import { environment } from '../../environments/environment'

import { CheckoutComponent } from '@features/checkout/checkout.component'
import { PaymentComponent } from '@features/checkout/payment/payment.component'

import { BraintreeModule } from '@features/braintree/braintree.module'

const COMPONENTS = [
  CheckoutComponent,
  PaymentComponent,
]

const ENTRY_COMPONENTS = [
]

const SERVICES = [
  CategoryService,
  CheckoutService
]

@NgModule({
  imports: [
    BraintreeModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CoreModule,
    SharedModule,
    EffectsModule.forFeature([
      CategoryEffects,
      CheckoutEffects
    ]),
  ],
  declarations: [...COMPONENTS],
  entryComponents: [...ENTRY_COMPONENTS],
  providers: [...SERVICES]
})
export class FeatureModule {
  static forRoot() {
    return {
      ngModule: FeatureModule
    }
  }
}
