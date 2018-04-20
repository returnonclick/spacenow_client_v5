import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from '@angular/router'
import { FlexLayoutModule } from '@angular/flex-layout'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { EffectsModule } from '@ngrx/effects'

import { MaterialModule } from "@shared/material.module"
import { SharedModule } from '@app/shared/shared.module'
import { AddressComponent } from './address.component'

const routes: Routes = [
  {
      "path": "",
      "component": AddressComponent
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
    SharedModule
  ],
  exports: [
    RouterModule
  ],
  declarations: [AddressComponent]
})

export class AddressModule { }
