import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from '@angular/router'
import { FlexLayoutModule } from '@angular/flex-layout'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { MaterialModule } from "@shared/material.module"

import { BookingComponent } from './booking.component'
import { OpeningTimeComponent } from './opening-time/opening-time.component'
import { OpeningDayComponent } from "./opening-time/opening-day/opening-day.component"

const routes: Routes = [
  {
      "path": "",
      "component": BookingComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule
  ],
  exports: [
    RouterModule
  ],
  declarations: [
    BookingComponent,
    OpeningTimeComponent, 
    OpeningDayComponent
  ],
  entryComponents: [
    OpeningTimeComponent, 
    OpeningDayComponent
  ]
})

export class BookingModule { }
