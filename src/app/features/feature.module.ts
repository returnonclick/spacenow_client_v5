import { AgmCoreModule } from '@agm/core'

import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FlexLayoutModule } from '@angular/flex-layout'
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'

import { CoreModule } from '@core/core.module'
import { SharedModule } from '@shared/shared.module'

import { AngularFireDatabaseModule } from 'angularfire2/database'
import { AngularFireAuthModule } from 'angularfire2/auth'
import { AngularFirestoreModule } from 'angularfire2/firestore'

import { SearchService } from '@core/store/search/services/search'
import { SearchEffects } from '@core/store/search/effects/search'

import { SpaceService } from '@core/store/spaces/services/space'
import { SpaceEffects } from '@core/store/spaces/effects/space'

import { environment } from '../../environments/environment'

import { MySpacesComponent } from '@features/my-spaces/my-spaces.component'
import { MyCalendarComponent } from '@features/my-calendar/my-calendar.component'
import { MyFavoritesComponent } from '@features/my-favorites/my-favorites.component'
import { SearchComponent } from '@features/search/search.component'
import { SpaceComponent } from '@features/space/space.component'

const COMPONENTS = [
  MySpacesComponent,
  MyCalendarComponent,
  MyFavoritesComponent,
  SearchComponent,
  SpaceComponent,
]

const ENTRY_COMPONENTS = [
]

const SERVICES = [
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
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CoreModule,
    SharedModule,
    EffectsModule.forFeature([
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
