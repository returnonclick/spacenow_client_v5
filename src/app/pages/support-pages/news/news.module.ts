import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from '@angular/router'
import { LayoutModule } from '@app/layout/layout.module'
import { FooterComponent } from '@app/layout/footer/footer.component'
import { MaterialModule } from '@app/shared/material.module'
import { NewsComponent } from './news.component'
import { NewsItemComponent } from './news-item/news-item.component'
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
                  "component": NewsComponent
              },
              {
                "path": ":id",
                "component": NewsComponent
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
  declarations: [
    NewsComponent,
    NewsItemComponent
  ]
})
export class NewsModule { }
