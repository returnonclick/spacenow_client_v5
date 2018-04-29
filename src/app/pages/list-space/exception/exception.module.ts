import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from '@angular/router'
import { FlexLayoutModule } from '@angular/flex-layout'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { MaterialModule } from "@shared/material.module"
import { ExceptionComponent } from './exception.component'

const routes: Routes = [
  {
      "path": "",
      "component": ExceptionComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule
  ],
  exports: [
    RouterModule
  ],
  declarations: [ExceptionComponent]
})

export class ExceptionModule { }
