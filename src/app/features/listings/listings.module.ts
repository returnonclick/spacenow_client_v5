import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FlexLayoutModule } from '@angular/flex-layout'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { EffectsModule } from '@ngrx/effects'

// import { MaterialModule } from "@shared/material.module"

import { SharedModule } from '@shared/shared.module'

import { PerfectScrollbarConfigInterface, PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG } from "ngx-perfect-scrollbar"

import { GeneralComponent } from '@features/listings/general/general.component'
import { DailyComponent } from '@features/listings/price/daily/daily.component'
import { HourlyComponent } from '@features/listings/price/hourly/hourly.component'
import { WeeklyComponent } from '@features/listings/price/weekly/weekly.component'
import { MonthlyComponent } from '@features/listings/price/monthly/monthly.component'
import { PriceComponent } from '@features/listings/price/price.component'
import { SNPriceDirective } from '@features/listings/price/price.directive'

import { ListingService } from '@core/store/listings/services/listing'
import { ListingEffects } from '@core/store/listings/effects/listing'

import { CategoryService } from '@core/store/categories/services/category'
import { CategoryEffects } from '@core/store/categories/effects/category'

const COMPONENTS = [
  GeneralComponent,
  DailyComponent,
  HourlyComponent,
  WeeklyComponent,
  MonthlyComponent,
  PriceComponent,
  SNPriceDirective
]

const ENTRY_COMPONENTS = [
  DailyComponent,
  HourlyComponent,
  WeeklyComponent,
  MonthlyComponent,
]

const MODULES = [
  // MaterialModule
  SharedModule
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
    EffectsModule.forFeature([CategoryEffects]),
  ],
  declarations: [COMPONENTS, PIPES],
  entryComponents: ENTRY_COMPONENTS,
  exports: [COMPONENTS, MODULES, PIPES],
  providers: [
    ListingService,
    CategoryService,
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
