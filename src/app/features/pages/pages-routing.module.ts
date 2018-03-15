import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { HomeComponent } from "@features/pages/home/home.component"
import { SpaceComponent } from '@features/pages/space/space.component'
import { SearchComponent } from '@features/pages/search/search.component'
 
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'space', component: SpaceComponent },
  { path: 'search', component: SearchComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
