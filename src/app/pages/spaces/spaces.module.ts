import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from '@angular/router'
import { FlexLayoutModule } from '@angular/flex-layout'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { MaterialModule } from "@shared/material.module"
import { SharedModule } from '@app/shared/shared.module'
import { SpacesComponent } from './spaces.component'
import { AgmCoreModule } from '@agm/core'

const routes: Routes = [
  {
      "path": "",
      "component": SpacesComponent
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
  declarations: [SpacesComponent]
})
export class SpacesModule { }
