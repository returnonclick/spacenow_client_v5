import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from '@angular/router'
import { LayoutModule } from '@app/layout/layout.module'
import { MaterialModule } from '@app/shared/material.module'
import { RefundCancellationPolicyComponent } from './refund-cancellation-policy.component'
import { TermsConditionsComponent } from '../terms-conditions.component'

const routes: Routes = [
  {
      "path": "",
      "component": TermsConditionsComponent,
      "children": [
          {
              "path": "",
              "component": RefundCancellationPolicyComponent
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
  declarations: [RefundCancellationPolicyComponent]
})

export class PrivacyPolicyModule { }
 