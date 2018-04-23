import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FlexLayoutModule } from '@angular/flex-layout'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { EffectsModule } from '@ngrx/effects'

import { MaterialModule } from "@shared/material.module"
import { SharedModule } from '@shared/shared.module'
import { ListSpaceRoutingModule } from '@app/pages/list-space/list-space-routing.module'

import { ContainerComponent } from '@app/pages/list-space/container/container.component'

import { ListingService } from '@core/store/listings/services/listing'
import { ListingEffects } from '@core/store/listings/effects/listing'
import { AmenityService } from '@app/core/store/amenities/services/amenity'
import { AmenityEffects } from '@app/core/store/amenities/effects/amenity'

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ListSpaceRoutingModule,
    EffectsModule.forFeature([ListingEffects, AmenityEffects])
  ],
  declarations: [
    ContainerComponent
  ],
  exports: [
    ContainerComponent
  ],
  providers: [
    ListingService,
    AmenityService
  ]
})
export class ListSpaceModule {
  static forRoot() {
    return {
      ngModule: ListSpaceModule
    }
  }
}
