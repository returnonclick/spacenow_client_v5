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

import { UsersRoutingModule }         from '@app/users/users-routing.module'
import { ProfileDetailComponent }     from "@app/users/profile-detail/profile-detail.component"
import { ProfileContainerComponent }  from '@app/users/profile-container/profile-container.component'
import { SpacesComponent }            from '@app/users/spaces/spaces.component'
import { CalendarComponent }          from '@app/users/calendar/calendar.component'
import { FavoritesComponent }         from '@app/users/favorites/favorites.component'

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
