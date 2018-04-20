import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'

import { EffectsModule } from '@ngrx/effects'
import { MaterialModule } from '@app/shared/material.module'
import { SharedModule } from '@app/shared/shared.module'

import { FooterComponent } from "@app/layout/footer/footer.component"
import { HeaderComponent } from "@app/layout/header/header.component"
import { QuickSidebarComponent } from "@app/layout/quick-sidebar/quick-sidebar.component"
import { ScrollTopComponent } from "@app/layout/scroll-top/scroll-top.component"
import { SupportPagesComponent } from "@app/pages/support-pages/support-pages.component"
import { TermsConditionsComponent } from "@app/pages/terms-conditions/terms-conditions.component"

import { AuthEffects } from '@app/core/store/auth/effects/auth'
import { AuthService } from '@core/store/auth/services/auth'

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    SharedModule,
    EffectsModule.forFeature([AuthEffects])
  ],
  declarations: [
    FooterComponent,
    HeaderComponent,
    QuickSidebarComponent,
    ScrollTopComponent,
    SupportPagesComponent,
    TermsConditionsComponent
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    QuickSidebarComponent,
    ScrollTopComponent,
    SupportPagesComponent,
    TermsConditionsComponent
  ],
  providers: [
    AuthService,
  ]
})
export class LayoutModule { }
