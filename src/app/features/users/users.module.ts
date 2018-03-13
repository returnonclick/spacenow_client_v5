import { NgModule }           from '@angular/core'
import { CommonModule }       from '@angular/common';
import { FlexLayoutModule }   from '@angular/flex-layout'
import { ReactiveFormsModule, 
         FormsModule }        from '@angular/forms'

import { StoreModule }        from '@ngrx/store'
import { EffectsModule }      from '@ngrx/effects'


import { UserService }        from '@core/store/users/services/user'
import { UserEffects }        from '@core/store/users/effects/user'
import { UserProfileService } from '@core/store/users-profile/services/user-profile'
import { UserProfileEffects } from '@core/store/users-profile/effects/user-profile'

import { SharedModule }       from '@shared/shared.module'

import { UsersRoutingModule }         from '@features/users/users-routing.module'
import { ProfileDetailComponent }     from "@features/users/profile-detail/profile-detail.component"
import { ProfileContainerComponent }  from '@features/users/profile-container/profile-container.component'
import { SpacesComponent }            from '@features/users/spaces/spaces.component'
import { CalendarComponent }          from '@features/users/calendar/calendar.component'
import { FavoritesComponent }         from '@features/users/favorites/favorites.component'

const COMPONENTS = [
  CalendarComponent,
  FavoritesComponent,
  ProfileDetailComponent,
  ProfileContainerComponent,
  SpacesComponent
]

const MODULES = [
  CommonModule,
  SharedModule,
  FlexLayoutModule,
  ReactiveFormsModule,
  FormsModule,
  UsersRoutingModule,
  EffectsModule.forFeature([
    UserEffects, UserProfileEffects
  ]),
]

const SERVICES = [
  UserService,
  UserProfileService
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
