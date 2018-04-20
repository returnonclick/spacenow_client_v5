import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from '@angular/router'
import { FlexLayoutModule } from '@angular/flex-layout'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { MaterialModule } from "@shared/material.module"
import { SharedModule } from '@app/shared/shared.module'
import { SpaceComponent } from './space.component'
import { AgmCoreModule } from '@agm/core'

const routes: Routes = [
  {
      "path": "",
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
    AgmCoreModule
  ],
  exports: [
    RouterModule
  ],
  declarations: [SpaceComponent]
})
export class SpaceModule { }