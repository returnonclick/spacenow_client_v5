import { AgmCoreModule } from '@agm/core'

import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FlexLayoutModule } from '@angular/flex-layout'
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'

import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'

import { CoreModule } from '@core/core.module'
import { SharedModule } from '@shared/shared.module'
import { SpacesModule } from '@features/spaces/spaces.module'

import { AngularFireDatabaseModule } from 'angularfire2/database'
import { AngularFireAuthModule } from 'angularfire2/auth'
import { AngularFirestoreModule } from 'angularfire2/firestore'

import { SearchService } from '@core/store/search/services/search'
import { SearchEffects } from '@core/store/search/effects/search'

import { SpaceService } from '@core/store/spaces/services/space'
import { SpaceEffects } from '@core/store/spaces/effects/space'

import { CategoryService } from '@core/store/categories/services/category'
import { CategoryEffects } from '@core/store/categories/effects/category'

import { CheckoutService } from '@core/store/checkout/services/checkout'
import { CheckoutEffects } from '@core/store/checkout/effects/checkout'

import { environment } from '../../environments/environment'

import { MySpacesComponent } from '@features/my-spaces/my-spaces.component'
import { MyCalendarComponent } from '@features/my-calendar/my-calendar.component'
import { MyFavoritesComponent } from '@features/my-favorites/my-favorites.component'
import { SearchComponent } from '@features/search/search.component'
import { SpaceComponent } from '@features/space/space.component'
import { CheckoutComponent } from '@features/checkout/checkout.component'
import { PaymentComponent } from '@features/checkout/payment/payment.component'

import { BraintreeModule } from '@features/braintree/braintree.module'

const COMPONENTS = [
  MySpacesComponent,
  MyCalendarComponent,
  MyFavoritesComponent,
  SearchComponent,
  SpaceComponent,
  CheckoutComponent,
  PaymentComponent,
]

const ENTRY_COMPONENTS = [
]

const SERVICES = [
  CategoryService,
  CheckoutService,
  SearchService,
  SpaceService,
]

@NgModule({
  imports: [
    AgmCoreModule.forRoot({
      apiKey: environment.googleApi,
      libraries: [
        'places'
      ]
    }),
    BraintreeModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CoreModule,
    SharedModule,
    RouterModule,
    SpacesModule,
    EffectsModule.forFeature([
      CategoryEffects,
      CheckoutEffects,
      SearchEffects,
      SpaceEffects,
    ]),
  ],
  declarations: COMPONENTS,
  entryComponents: ENTRY_COMPONENTS,
  providers: SERVICES
})
export class FeatureModule {
  static forRoot() {
    return {
      ngModule: FeatureModule
    }
  }
}
