import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from '@angular/router'
import { LayoutModule } from '@app/layout/layout.module'
import { MaterialModule } from '@app/shared/material.module'
import { FlexLayoutModule } from '@angular/flex-layout'
import { FooterComponent } from '@app/layout/footer/footer.component'
import { HelpComponent } from './help.component'
import { SupportPagesComponent } from '../support-pages.component'

const routes: Routes = [
  {
    "path": "",
    "component": FooterComponent,
    "children": [
      {
        "path": "",
        "component": SupportPagesComponent,
        "children": [
          {
            "path": "",
            "component": HelpComponent,
            "children": [
              {
                "path": "about-spacenow",
                "loadChildren": "./about-spacenow/about-spacenow.module#AboutSpacenowModule"
              },
              {
                "path": "getting-started",
                "loadChildren": "./getting-started/getting-started.module#GettingStartedModule"
              },
              {
                "path": "how-works",
                "loadChildren": "./how-works/how-works.module#HowWorksModule"
              },
              {
                "path": "top-question",
                "loadChildren": "./top-question/top-question.module#TopQuestionModule"
              }
            ]
          },
          {
            "path": "help",
            "component": HelpComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    LayoutModule,
    MaterialModule,
    FlexLayoutModule
  ],
  exports: [
    RouterModule
  ],
  declarations: [HelpComponent]
})
export class HelpModule { }
