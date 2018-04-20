import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from '@angular/router'
import { SharedModule } from '@app/shared/shared.module'
import { MySpacesComponent } from './my-spaces.component'

const routes: Routes = [
  {
      "path": "",
      "component": MySpacesComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  exports: [
    RouterModule
  ],
  declarations: [MySpacesComponent]
})
export class MySpacesModule { }
