import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FlexLayoutModule } from '@angular/flex-layout'
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'

import { CoreModule } from '@core/core.module'
import { SharedModule } from '@shared/shared.module'
import { ListingModule } from '@features/listings/listings.module'

import { AngularFireDatabaseModule } from 'angularfire2/database'
import { AngularFireAuthModule } from 'angularfire2/auth'
import { AngularFirestoreModule } from 'angularfire2/firestore'

import { UserService } from '@core/store/users/services/user'
import { UserEffects } from '@core/store/users/effects/user'

import {
  UserComponent,
  UserListComponent
} from '@features/users'

import {
  HomeComponent
} from '@features/pages/home/home.component'

import {
  MySpacesComponent,
} from '@features/my-spaces/my-spaces.component'

const COMPONENTS = [
  UserComponent,
  UserListComponent,
  HomeComponent,
  MySpacesComponent,
]

const ENTRY_COMPONENTS = [
  UserComponent
]

const SERVICES = [
  UserService,
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CoreModule,
    SharedModule,
    ListingModule,
    EffectsModule.forFeature([UserEffects]),
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
