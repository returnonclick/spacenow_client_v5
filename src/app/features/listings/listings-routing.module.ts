import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContainerComponent } from './container/container.component'

import { OpeningTimeComponent } from './opening-time/opening-time.component'
 
const routes: Routes = [
  {
    path: '', component: ContainerComponent,
  },
  {
    path: ':id', component: ContainerComponent
  },
  // {
  //   path: 'test', component: OpeningTimeComponent
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListingsRoutingModule { }
