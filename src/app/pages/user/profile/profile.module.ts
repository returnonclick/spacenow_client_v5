import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from '@angular/router'
import { LayoutModule } from '@app/layout/layout.module'
import { FlexLayoutModule } from '@angular/flex-layout'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { EffectsModule } from '@ngrx/effects'
import { MaterialModule } from "@shared/material.module"
import { SharedModule } from '@app/shared/shared.module'
import { UserComponent } from '../user.component'
import { ProfileComponent } from './profile.component'
import { UserProfileEffects } from '@app/core/store/users-profile/effects/user-profile'
import { UserProfileService } from '@app/core/store/users-profile/services';

const routes: Routes = [
  {
      "path": "",
      "component": UserComponent,
      "children": [
          {
              "path": "",
              "component": ProfileComponent
          }
      ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
    EffectsModule.forFeature([UserProfileEffects]),
    LayoutModule,
    SharedModule
  ],
  exports: [
    RouterModule
  ],
  declarations: [
    ProfileComponent
  ],
  providers: [
    UserProfileService
  ]
})
export class ProfileModule { }
