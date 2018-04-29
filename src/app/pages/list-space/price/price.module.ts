import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from '@angular/router'
import { FlexLayoutModule } from '@angular/flex-layout'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { MaterialModule } from "@shared/material.module"

import { DailyComponent } from './daily/daily.component'
import { HourlyComponent } from './hourly/hourly.component'
import { MonthlyComponent } from './monthly/monthly.component'
import { PriceComponent } from './price.component'
import { WeeklyComponent } from './weekly/weekly.component'

import { SNPriceDirective } from './price.directive'

const routes: Routes = [
  {
      "path": "",
      "component": PriceComponent
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
  ],
  exports: [
    RouterModule
  ],
  declarations: [
    PriceComponent, 
    SNPriceDirective,
    DailyComponent,
    HourlyComponent,
    MonthlyComponent,
    WeeklyComponent
  ],
  entryComponents: [
    DailyComponent,
    HourlyComponent,
    MonthlyComponent,
    WeeklyComponent
  ]
})
export class PriceModule { }
