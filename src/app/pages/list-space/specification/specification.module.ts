import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from '@angular/router'
import { FlexLayoutModule } from '@angular/flex-layout'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { EffectsModule } from '@ngrx/effects'

import { MaterialModule } from "@shared/material.module"
import { SpecificationComponent } from './specification.component'
import { ListingSpecificationService } from '@core/store/listing-specifications/services/listing-specification'
import { ListingSpecificationEffects } from '@core/store/listing-specifications/effects/listing-specification'

const routes: Routes = [
  {
      "path": "",
      "component": SpecificationComponent
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
    EffectsModule.forFeature([ListingSpecificationEffects])
  ],
  exports: [
    RouterModule
  ],
  declarations: [
    SpecificationComponent
  ],
  providers: [
    ListingSpecificationService
  ]
})
export class SpecificationModule { }
