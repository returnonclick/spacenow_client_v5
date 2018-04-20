import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from '@angular/router'
import { MaterialModule } from '@app/shared/material.module'
import { ManageBookingsComponent } from './manage-bookings.component'

const routes: Routes = [
  {
      "path": "",
      "component": ManageBookingsComponent
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
  declarations: [ManageBookingsComponent]
})
export class ManageBookingsModule { }
