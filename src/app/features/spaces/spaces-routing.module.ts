import { NgModule, ModuleWithProviders } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { SpacesComponent } from './spaces.component'
import { SpaceComponent } from './space/space.component'

const spacesRoutes: Routes = [
  {
    path: '', component: SpacesComponent,
    children: [
      { path: '', component: SpaceComponent }
    ]
  }
 ]

@NgModule({
  imports: [RouterModule.forChild(spacesRoutes)],
  exports: [RouterModule]
})
export class SpacesRoutingModule {}


// export const SpacesRoutingModule: ModuleWithProviders = RouterModule.forChild(spacesRoutes);
