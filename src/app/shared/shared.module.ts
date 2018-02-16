import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FlexLayoutModule } from '@angular/flex-layout'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'

import { CoreModule } from '@core/core.module'
import { AuthService } from '@core/store/auth/services/auth'
import { FileSizePipe } from "@shared/pipes/file-size.pipe"
import { MaterialModule } from "@shared/material.module"

import { PerfectScrollbarConfigInterface, PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG } from "ngx-perfect-scrollbar"

import { AgmCoreModule } from '@agm/core';

import {
  ForgotPasswordComponent,
  SignInComponent,
  SignUpComponent,
  CardComponent, 
  FeaturedCardComponent,
  ConfirmDeleteComponent,
  ConfirmSaveComponent,
  FilterComponent,
  GoogleAddressComponent,
  ImageDataComponent,
  InputCardComponent,
  SliderComponent,
  TableComponent,
  TableSelectorComponent,
  LayoutComponent,
  LoadingComponent,
  LoadingOverlayComponent
} from './components'

const COMPONENTS = [
  ForgotPasswordComponent,
  SignInComponent,
  SignUpComponent,
  CardComponent, 
  FeaturedCardComponent,
  ConfirmDeleteComponent,
  ConfirmSaveComponent,
  FilterComponent,
  GoogleAddressComponent,
  ImageDataComponent,
  InputCardComponent,
  SliderComponent,
  TableComponent,
  TableSelectorComponent,
  LayoutComponent,
  LoadingComponent,
  LoadingOverlayComponent
]

const MODULES = [
  MaterialModule
]

const PIPES = [
  FileSizePipe
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
  declarations: [COMPONENTS, PIPES],
  entryComponents: COMPONENTS,
  exports: [COMPONENTS, MODULES, PIPES],
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
