import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FlexLayoutModule } from '@angular/flex-layout'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { EffectsModule } from '@ngrx/effects'

import { MaterialModule } from "@shared/material.module"

import { PerfectScrollbarConfigInterface, PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG } from "ngx-perfect-scrollbar"

import { GeneralComponent } from '@features/listings/general/general.component'
import { DailyComponent } from '@features/listings/price/daily/daily.component'
import { HourlyComponent } from '@features/listings/price/hourly/hourly.component'
import { WeeklyComponent } from '@features/listings/price/weekly/weekly.component'
import { MonthlyComponent } from '@features/listings/price/monthly/monthly.component'

import { ListingService } from '@core/store/listings/services/listing'
import { ListingEffects } from '@core/store/listings/effects/listing'

const COMPONENTS = [
  GeneralComponent,
  DailyComponent,
  HourlyComponent,
  WeeklyComponent,
  MonthlyComponent
]

const MODULES = [
  MaterialModule
]

const PIPES = [
]

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    RouterModule,
    MODULES,
    PerfectScrollbarModule,
    EffectsModule.forFeature([ListingEffects]),
  ],
  declarations: [COMPONENTS, PIPES],
  entryComponents: COMPONENTS,
  exports: [COMPONENTS, MODULES, PIPES],
  providers: [
    ListingService,
    { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG }
  ]
})
export class ListingModule { 
  static forRoot() {
    return {
      ngModule: ListingModule
    }
  }
}
