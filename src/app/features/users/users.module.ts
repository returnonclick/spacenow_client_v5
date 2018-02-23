import { NgModule } from '@angular/core'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'

import { UsersRoutingModule } from '@features/users/users-routing.module'

import { UserService } from '@core/store/users/services/user'
import { UserEffects } from '@core/store/users/effects/user'

import { SharedModule } from '@shared/shared.module'

import { ProfileComponent } from "@features/users/profile/profile.component"

const COMPONENTS = [
  ProfileComponent
]

const MODULES = [
  SharedModule,
  UsersRoutingModule,
  EffectsModule.forFeature([
    UserEffects,
  ]),
]

const SERVICES = [
  UserService
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
