import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from '@angular/router'
import { FlexLayoutModule } from '@angular/flex-layout'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { EffectsModule } from '@ngrx/effects'
import { MaterialModule } from "@shared/material.module"
import { CategoryComponent } from './category.component'
import { CategoryService } from '@core/store/categories/category.service'
import { CategoryEffects } from '@core/store/categories/category.effect'

const routes: Routes = [
  {
      "path": "",
      "component": CategoryComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
    EffectsModule.forFeature([CategoryEffects])
  ],
  exports: [
    RouterModule
  ],
  declarations: [
    CategoryComponent
  ],
  providers: [
    CategoryService
  ]
})

export class CategoryModule { }
