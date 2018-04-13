import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FlexLayoutModule } from '@angular/flex-layout'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { EffectsModule } from '@ngrx/effects'

import { PagesRoutingModule } from '@app/pages/pages-routing.module'

import { MaterialModule } from "@shared/material.module"
import { SharedModule } from '@shared/shared.module'

import { PerfectScrollbarConfigInterface, PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG } from "ngx-perfect-scrollbar"

import { ContainerComponent } from '@app/pages/container/container.component'
import { TermComponent } from '@app/pages/terms/term.component'
import { HostTermComponent } from './host-terms/host-term.component'
import { PrivacyComponent } from './privacy/privacy.component'
import { DictionaryComponent } from './dictionary/dictionary.component'
import { RefundPolicyComponent } from './refund-policy/refund.component'
import { AboutComponent } from './about/about.component'
import { HelpComponent } from './help/help.component'
import { TopQuestionComponent } from './help/top-question/top-question.component'
import { AboutSpacenowComponent } from './help/about-spacenow/about-spacenow.component'
import { GettingStartedComponent } from './help/getting-started/getting-started.component'
import { HowWorksComponent } from './help/how-works/how-works.component'
import { NewsComponent } from './news/news.component'


const COMPONENTS = [
  ContainerComponent,
  TermComponent,
  HostTermComponent,
  PrivacyComponent,
  DictionaryComponent,
  RefundPolicyComponent,
  AboutComponent,
  HelpComponent,
  TopQuestionComponent,
  AboutSpacenowComponent,
  GettingStartedComponent,
  HowWorksComponent,
  NewsComponent
]

const ENTRY_COMPONENTS = [
]

const MODULES = [
  MaterialModule,
  SharedModule,
  PagesRoutingModule
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
    PagesRoutingModule,
    MODULES,
    PerfectScrollbarModule,
  ],
  declarations: [...COMPONENTS, ...PIPES],
  entryComponents: ENTRY_COMPONENTS,
  exports: [...COMPONENTS, ...MODULES, ...PIPES],
  providers: [
    { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG }
  ]
})
export class PageModule {
  static forRoot() {
    return {
      ngModule: PageModule
    }
  }
}
