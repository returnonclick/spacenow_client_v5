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

import { GoogleAddressDirective } from '@shared/directives/google-address/google-address.directive'
import { ImageUploadDirective } from '@shared/directives/image-resize-upload/image-upload.directive'

import {
  ForgotPasswordComponent,
  SignInComponent,
  SignUpComponent,
  CardComponent,
  FeaturedCardComponent,
  ConfirmDeleteComponent,
  ConfirmSaveComponent,
  FilterComponent,
  ImageDataComponent,
  InputCardComponent,
  SliderComponent,
  SpaceListItemComponent,
  TableComponent,
  TableSelectorComponent,
  LayoutComponent,
  LoadingComponent,
  LoadingOverlayComponent,
  ImageUploadComponent
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
  ImageDataComponent,
  InputCardComponent,
  SliderComponent,
  SpaceListItemComponent,
  TableComponent,
  TableSelectorComponent,
  LayoutComponent,
  LoadingComponent,
  LoadingOverlayComponent,
  ImageUploadComponent
]

const DIRECTIVES = [
  ImageUploadDirective
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
  declarations: [
    COMPONENTS,
    DIRECTIVES,
    PIPES,
    GoogleAddressDirective],
  entryComponents: COMPONENTS,
  exports: [
    COMPONENTS,
    DIRECTIVES,
    MODULES,
    PIPES,
    GoogleAddressDirective
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
