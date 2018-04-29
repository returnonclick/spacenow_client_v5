import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from '@angular/router'
import { MaterialModule } from '@app/shared/material.module'
import { TopQuestionComponent } from './top-question.component'

const routes: Routes = [
  {
      "path": "",
      "component": TopQuestionComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule
  ],
  exports: [
    RouterModule
  ],
  declarations: [TopQuestionComponent]
})
export class TopQuestionModule { }
