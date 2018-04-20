import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FlexLayoutModule } from '@angular/flex-layout'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'

import { BookingEffects } from '@core/store/bookings/effects/booking'
import { BookingService } from '@core/store/bookings/services/booking'

import { UserService } from '@core/store/users/services/user'
import { UserEffects } from '@core/store/users/effects/user'
import { UserProfileService } from '@core/store/users-profile/services/user-profile'
import { UserProfileEffects } from '@core/store/users-profile/effects/user-profile'

import { SharedModule } from '@shared/shared.module'

import { UserRoutingModule } from '@app/pages/user/user-routing.module'
import { UserComponent } from "@app/pages/user/user.component"

const MODULES = [
  CommonModule,
  SharedModule,
  FlexLayoutModule,
  ReactiveFormsModule,
  FormsModule,
  UserRoutingModule,
  EffectsModule.forFeature([
    BookingEffects,
    UserEffects,
    UserProfileEffects,
  ])
]

const SERVICES = [
  BookingService,
  UserService,
  UserProfileService,
]

@NgModule({
  declarations: [UserComponent],
  imports: [MODULES],
  providers: SERVICES
})
export class UserModule {
  static forRoot() {
    return {
      ngModule: UserModule
    }
  }
}
