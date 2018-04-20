import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from '@angular/router'
import { MaterialModule } from '@app/shared/material.module'
import { BookingRequestsComponent } from './booking-requests.component'

const routes: Routes = [
  {
      "path": "",
      "component": BookingRequestsComponent
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
  declarations: [BookingRequestsComponent]
})
export class BookingRequestsModule { }
