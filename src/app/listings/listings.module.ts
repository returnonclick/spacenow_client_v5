import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FlexLayoutModule } from '@angular/flex-layout'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { EffectsModule } from '@ngrx/effects'

import { ListingsRoutingModule } from '@app/listings/listings-routing.module'

import { MaterialModule } from "@shared/material.module"
import { SharedModule } from '@shared/shared.module'

import { PerfectScrollbarConfigInterface, PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG } from "ngx-perfect-scrollbar"

import { ContainerComponent } from '@app/listings/container/container.component'
import { DailyComponent } from '@app/listings/price/daily/daily.component'
import { HourlyComponent } from '@app/listings/price/hourly/hourly.component'
import { WeeklyComponent } from '@app/listings/price/weekly/weekly.component'
import { MonthlyComponent } from '@app/listings/price/monthly/monthly.component'
import { PriceComponent } from '@app/listings/price/price.component'
import { SNPriceDirective } from '@app/listings/price/price.directive'
import { CategoryComponent } from '@app/listings/category/category.component'
import { AmenityComponent } from '@app/listings/amenity/amenity.component'
import { SpecificationComponent } from '@app/listings/specification/specification.component'
import { AddressComponent } from '@app/listings/address/address.component'
import { DescriptionComponent } from '@app/listings/description/description.component'
import { ImageComponent } from '@app/listings/image/image.component'
import { BookingComponent } from '@app/listings/booking/booking.component'
import { ExceptionComponent } from '@app/listings/exception/exception.component'
import { TermComponent } from '@app/listings/term/term.component'

import { OpeningTimeComponent } from './booking/opening-time/opening-time.component';
import { OpeningDayComponent } from './booking/opening-time/opening-day/opening-day.component'

import { ListingService } from '@core/store/listings/services/listing'
import { ListingEffects } from '@core/store/listings/effects/listing'
import { CategoryService } from '@core/store/categories/services/category'
import { CategoryEffects } from '@core/store/categories/effects/category'
import { AmenityService } from '@core/store/amenities/services/amenity'
import { AmenityEffects } from '@core/store/amenities/effects/amenity'
import { ListingSpecificationService } from '@core/store/listing-specifications/services/listing-specification'
import { ListingSpecificationEffects } from '@core/store/listing-specifications/effects/listing-specification'

const COMPONENTS = [
  ContainerComponent,
  DailyComponent,
  HourlyComponent,
  WeeklyComponent,
  MonthlyComponent,
  PriceComponent,
  SNPriceDirective,
  CategoryComponent,
  AmenityComponent,
  SpecificationComponent,
  AddressComponent,
  DescriptionComponent,
  ImageComponent,
  BookingComponent,
  ExceptionComponent,
  TermComponent,
  OpeningDayComponent,
  OpeningTimeComponent
]

const ENTRY_COMPONENTS = [
  DailyComponent,
  HourlyComponent,
  WeeklyComponent,
  MonthlyComponent

]

const MODULES = [
  MaterialModule,
  SharedModule,
  ListingsRoutingModule
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
    ListingsRoutingModule,
    MODULES,
    PerfectScrollbarModule,
    EffectsModule.forFeature([ListingEffects]),
    EffectsModule.forFeature([CategoryEffects]),
    EffectsModule.forFeature([AmenityEffects]),
    EffectsModule.forFeature([ListingSpecificationEffects]),
  ],
  declarations: [...COMPONENTS, ...PIPES],
  entryComponents: ENTRY_COMPONENTS,
  exports: [...COMPONENTS, ...MODULES, ...PIPES],
  providers: [
    ListingService,
    CategoryService,
    AmenityService,
    ListingSpecificationService,
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
