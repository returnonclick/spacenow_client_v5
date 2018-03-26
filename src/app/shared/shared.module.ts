import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FlexLayoutModule } from '@angular/flex-layout'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'

import { CoreModule } from '@core/core.module'
import { AuthService } from '@core/store/auth/services/auth'
import { FileSizePipe } from "@shared/pipes/file-size.pipe"
import { DropZoneDirective } from "@shared/directives/drop-zone.directive"
import { MaterialModule } from "@shared/material.module"

import { PerfectScrollbarConfigInterface, PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG } from "ngx-perfect-scrollbar"

import { AgmCoreModule } from '@agm/core';

import { GoogleAddressDirective } from '@shared/directives/google-address/google-address.directive'
import { FoldingPDirective } from '@shared/directives/folding-p/folding-p.directive'
import { ClickOutsideDirective } from '@shared/utils/click-outside.directive'

import {
  ForgotPasswordComponent,
  SignInComponent,
  SignUpComponent,
  AddressComponent,
  CardComponent,
  FeaturedCardComponent,
  ConfirmDeleteComponent,
  ConfirmSaveComponent,
  ContactComponent,
  FilterComponent,
  ImageDataComponent,
  InputCardComponent,
  SliderComponent,
  SpaceListItemComponent,
  TableComponent,
  TableSelectorComponent,
  LayoutComponent,
  LayoutNoFooterComponent,
  LoadingComponent,
  LoadingOverlayComponent,
  GeneralBookingComponent,
  HourlyBookingComponent,
} from './components'

const COMPONENTS = [
  ForgotPasswordComponent,
  SignInComponent,
  SignUpComponent,
  AddressComponent,
  CardComponent,
  FeaturedCardComponent,
  ConfirmDeleteComponent,
  ConfirmSaveComponent,
  ContactComponent,
  FilterComponent,
  ImageDataComponent,
  InputCardComponent,
  SliderComponent,
  SpaceListItemComponent,
  TableComponent,
  TableSelectorComponent,
  LayoutComponent,
  LayoutNoFooterComponent,
  LoadingComponent,
  LoadingOverlayComponent,
  GeneralBookingComponent,
  HourlyBookingComponent,
]

const DIRECTIVES = [
  GoogleAddressDirective,
  FoldingPDirective,
  ClickOutsideDirective
]

const MODULES = [
  MaterialModule
]

const PIPES = [
  FileSizePipe,
  DropZoneDirective
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
    CoreModule,
    PerfectScrollbarModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyAOMhtcFm3WnFDUAsK7OfWOvpo3V0EtvBQ",
      libraries: ["places"]
    })
  ],
  declarations: [
    ...COMPONENTS,
    ...DIRECTIVES,
    PIPES,
  ],
  entryComponents: COMPONENTS,
  exports: [
    ...COMPONENTS,
    ...DIRECTIVES,
    MODULES,
    PIPES,
  ],
  providers: [
    { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG }
  ]
})
export class SharedModule {
  static forRoot() {
    return {
      ngModule: SharedModule
    }
  }
}
