import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from '@angular/router'
import { MaterialModule } from '@app/shared/material.module'
import { HowWorksComponent } from './how-works.component'

const routes: Routes = [
  {
      "path": "",
      "component": HowWorksComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule
  ],
  exports: [
    RouterModule
  ],
  declarations: [HowWorksComponent]
})
export class HowWorksModule { }
