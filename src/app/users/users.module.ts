import { NgModule }           from '@angular/core'
import { CommonModule }       from '@angular/common';
import { FlexLayoutModule }   from '@angular/flex-layout'
import { ReactiveFormsModule,
         FormsModule }        from '@angular/forms'

import { StoreModule }        from '@ngrx/store'
import { EffectsModule }      from '@ngrx/effects'

import { CategoryEffects } from '@core/store/categories/effects/category'
import { CategoryService } from '@core/store/categories/services/category'

import { UserService }        from '@core/store/users/services/user'
import { UserEffects }        from '@core/store/users/effects/user'
import { UserProfileService } from '@core/store/users-profile/services/user-profile'
import { UserProfileEffects } from '@core/store/users-profile/effects/user-profile'

import { SharedModule }       from '@shared/shared.module'

import { BraintreeModule }            from '@app/braintree/braintree.module'
import { UsersRoutingModule }         from '@app/users/users-routing.module'
import { ProfileDetailComponent }     from "@app/users/profile-detail/profile-detail.component"
import { ProfileContainerComponent }  from '@app/users/profile-container/profile-container.component'
import { SpacesComponent }            from '@app/users/spaces/spaces.component'
import { CalendarComponent }          from '@app/users/calendar/calendar.component'
import { FavoritesComponent }         from '@app/users/favorites/favorites.component'
import { CheckoutComponent }          from '@app/users/checkout/checkout.component'
import { PaymentComponent }           from '@app/users/checkout/payment/payment.component'

const COMPONENTS = [
  CalendarComponent,
  FavoritesComponent,
  ProfileDetailComponent,
  ProfileContainerComponent,
  SpacesComponent,
  CheckoutComponent,
  PaymentComponent,
]

const MODULES = [
  CommonModule,
  SharedModule,
  FlexLayoutModule,
  ReactiveFormsModule,
  FormsModule,
  UsersRoutingModule,
  EffectsModule.forFeature([
    CategoryEffects,
    UserEffects,
    UserProfileEffects,
  ]),
  BraintreeModule,
]

const SERVICES = [
  CategoryService,
  UserService,
  UserProfileService,
]

@NgModule({
  declarations: [COMPONENTS],
  imports: [MODULES],
  providers: SERVICES
})
export class UsersModule {
  static forRoot() {
    return {
      ngModule: UsersModule
    }
  }
}
