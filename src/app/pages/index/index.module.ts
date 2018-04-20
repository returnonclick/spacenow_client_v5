import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from '@angular/router'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { EffectsModule } from '@ngrx/effects'

import { LayoutModule } from '@app/layout/layout.module'
import { MaterialModule } from '@app/shared/material.module'
import { SharedModule } from '@app/shared/shared.module'
import { FooterComponent } from '@app/layout/footer/footer.component'
import { IndexComponent } from './index.component'

import { ListingShortDetailEffects } from '@app/core/store/listings-short-detail/listing-short-detail.effect'
import { ListingShortDetailService } from '@core/store/listings-short-detail/listing-short-detail.service'

const routes: Routes = [
  {
      "path": "",
      "component": FooterComponent,
      "children": [
          {
              "path": "",
              "component": IndexComponent
          }
      ]
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule, 
    FormsModule,
    LayoutModule,
    MaterialModule,
    SharedModule,
    EffectsModule.forFeature([ListingShortDetailEffects])
  ],
  exports: [
    RouterModule
  ],
  declarations: [
    IndexComponent
  ],
  providers: [
    ListingShortDetailService,
  ]
})
export class IndexModule { }
