import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from '@angular/router'
import { FlexLayoutModule } from '@angular/flex-layout'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { EffectsModule } from '@ngrx/effects'

import { MaterialModule } from "@shared/material.module"
import { AmenityComponent } from './amenity.component'
import { AmenityService } from '@core/store/amenities/services/amenity'
import { AmenityEffects } from '@core/store/amenities/effects/amenity'

const routes: Routes = [
  {
      "path": "",
      "component": AmenityComponent
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
    EffectsModule.forFeature([AmenityEffects])
  ],
  exports: [
    RouterModule
  ],
  declarations: [
    AmenityComponent
  ],
  providers: [
    AmenityService
  ]
})

export class AmenityModule { }
