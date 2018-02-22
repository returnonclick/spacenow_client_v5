import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListingsComponent } from './listings.component'
import { GeneralComponent } from './general/general.component';
 
const routes: Routes = [
  {
    path: '', component: ListingsComponent,

    children: [
      { path: '', component: GeneralComponent }
    ]
    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListingsRoutingModule { }
