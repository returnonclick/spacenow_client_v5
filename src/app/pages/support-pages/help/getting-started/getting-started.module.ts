import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from '@angular/router'
import { MaterialModule } from '@app/shared/material.module'
import { GettingStartedComponent } from './getting-started.component'

const routes: Routes = [
  {
      "path": "",
      "component": GettingStartedComponent
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
  declarations: [GettingStartedComponent]
})
export class GettingStartedModule { }

