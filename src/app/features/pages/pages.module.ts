import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FlexLayoutModule } from '@angular/flex-layout'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'

import { AgmCoreModule } from '@agm/core'
import { EffectsModule } from '@ngrx/effects'

import { PagesRoutingModule } from '@features/pages/pages-routing.module'
import { FeatureModule } from '@features/feature.module'

import { HomeComponent } from "@features/pages/home/home.component"
import { SpaceComponent } from '@features/pages/space/space.component'
import { SearchComponent } from '@features/pages/search/search.component'
import { MaterialModule } from '@shared/material.module';
import { SharedModule } from '@shared/shared.module';

import { SpaceService } from '@core/store/spaces/services/space'
import { SpaceEffects } from '@core/store/spaces/effects/space'

import { SearchService } from '@core/store/search/services/search'
import { SearchEffects } from '@core/store/search/effects/search'

import { environment } from '../../../environments/environment'


const COMPONENTS = [
  HomeComponent,
  SpaceComponent,
  SearchComponent
]

const MODULES = [
  FeatureModule,
  MaterialModule,
  SharedModule,
  PagesRoutingModule
]

const SERVICES = [
  SpaceService,
  SearchService
]


@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleApi,
      libraries: [
        'places'
      ]
    }),
    EffectsModule.forFeature([
      SpaceEffects,
      SearchEffects
    ]),
    ...MODULES
  ],
  exports: [],
  providers: [...SERVICES]
})
export class PagesModule {
  static forRoot() {
    return {
      ngModule: PagesModule
    }
  }
}
