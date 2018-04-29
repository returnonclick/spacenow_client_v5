import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from '@angular/router'
import { MaterialModule } from '@app/shared/material.module'
import { AboutSpacenowComponent } from './about-spacenow.component'

const routes: Routes = [
  {
      "path": "",
      "component": AboutSpacenowComponent
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
  declarations: [AboutSpacenowComponent]
})
export class AboutSpacenowModule { }