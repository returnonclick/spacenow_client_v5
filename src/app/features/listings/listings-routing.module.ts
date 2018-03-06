import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContainerComponent } from './container/container.component'
import { TitleComponent } from './title/title.component'

// import { OpeningTimeComponent } from './opening-time/opening-time.component'
 
const routes: Routes = [
  {
    path: '/:id', component: ContainerComponent,
    children: [
      { path: 'title', component: TitleComponent },
      // { path: 'price', component: PriceComponent },
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListingsRoutingModule { }
