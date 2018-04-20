import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from '@angular/router'
import { LayoutModule } from '@app/layout/layout.module'
import { AboutUsComponent } from './about-us.component'
import { SupportPagesComponent } from '../support-pages.component'

const routes: Routes = [
  {
      "path": "",
      "component": SupportPagesComponent,
      "children": [
          {
              "path": "",
              "component": AboutUsComponent
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
  declarations: [AboutUsComponent]
})
export class AboutUsModule { }
