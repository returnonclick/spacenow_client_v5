import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from '@angular/router'
import { LayoutModule } from '@app/layout/layout.module'
import { MaterialModule } from '@app/shared/material.module'
import { FooterComponent } from '@app/layout/footer/footer.component'
import { DictionaryComponent } from './dictionary.component'
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
            "component": DictionaryComponent
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
  declarations: [DictionaryComponent]
})

export class DictionaryModule { }
