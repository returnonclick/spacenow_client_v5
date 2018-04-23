import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from '@angular/router'
import { LayoutModule } from '@app/layout/layout.module'
import { MaterialModule } from '@app/shared/material.module'
import { FooterComponent } from '@app/layout/footer/footer.component'
import { TermsServiceComponent } from './terms-service.component'
import { TermsConditionsComponent } from '../terms-conditions.component'

const routes: Routes = [
  {
    "path": "",
    "component": FooterComponent,
    "children": [
      {
        "path": "",
        "component": TermsConditionsComponent,
        "children": [
          {
            "path": "",
            "component": TermsServiceComponent
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
    MaterialModule
  ],
  exports: [
    RouterModule
  ],
  declarations: [TermsServiceComponent]
})

export class TermsServiceModule { }
