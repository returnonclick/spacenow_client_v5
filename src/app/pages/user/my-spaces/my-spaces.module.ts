import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from '@angular/router'
import { EffectsModule } from '@ngrx/effects'
import { SharedModule } from '@app/shared/shared.module'
import { MySpacesComponent } from './my-spaces.component'

import { SpaceService } from '@core/store/spaces/services/space'
import { SpaceEffects } from '@core/store/spaces/effects/space'

const routes: Routes = [
  {
      "path": "",
      "component": MySpacesComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    EffectsModule.forFeature([SpaceEffects])
  ],
  exports: [
    RouterModule
  ],
  declarations: [
    MySpacesComponent
  ],
  providers: [
    SpaceService
  ]
})
export class MySpacesModule { }
