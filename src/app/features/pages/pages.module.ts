import { NgModule } from '@angular/core'
import { PagesRoutingModule } from '@features/pages/pages-routing.module'

import { SharedModule } from '@shared/shared.module'
import { MaterialModule } from "@shared/material.module"

import { HomeComponent } from "@features/pages/home/home.component"

const COMPONENTS = [
  HomeComponent
]

const MODULES = [
  MaterialModule,
  SharedModule,
  PagesRoutingModule
]


@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    MODULES
  ]
})
export class PagesModule {
  static forRoot() {
    return {
      ngModule: PagesModule
    }
  }
}
