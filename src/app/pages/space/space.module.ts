import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from '@angular/router'
import { EffectsModule } from '@ngrx/effects'
import { FlexLayoutModule } from '@angular/flex-layout'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { MaterialModule } from "@shared/material.module"
import { SharedModule } from '@app/shared/shared.module'
import { LayoutModule } from '@app/layout/layout.module'
import { SpaceComponent } from './space.component'
import { AgmCoreModule } from '@agm/core'

import { SpaceService } from '@core/store/spaces/services/space'
import { SpaceEffects } from '@core/store/spaces/effects/space'
import { AmenityEffects } from '@app/core/store/amenities/effects/amenity'
import { AmenityService } from '@app/core/store/amenities/services/amenity'
import { BookingService } from '@core/store/bookings/services/booking'
import { BookingEffects } from '@core/store/bookings/effects/booking'

const routes: Routes = [
  {
      "path": ":id",
      "component": SpaceComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
    SharedModule,
    EffectsModule.forFeature([
      AmenityEffects,
      BookingEffects,
      SpaceEffects,
    ]),
    LayoutModule,
    AgmCoreModule
  ],
  exports: [
    RouterModule
  ],
  declarations: [
    SpaceComponent
  ],
  providers: [
    AmenityService,
    BookingService,
    SpaceService,
  ]
})
export class SpaceModule { }
