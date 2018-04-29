import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from '@angular/router'
import { LayoutModule } from '@app/layout/layout.module'
import { PressComponent } from './press.component'
import { SupportPagesComponent } from '../support-pages.component'

const routes: Routes = [
  {
      "path": "",
      "component": SupportPagesComponent,
      "children": [
          {
              "path": "",
              "component": PressComponent
          }
      ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    LayoutModule
  ],
  exports: [
    RouterModule
  ],
  declarations: [
    PressComponent
  ]
})
export class PressModule { }
