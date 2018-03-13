import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module'

import { SpacesRoutingModule } from './spaces-routing.module';
import { SpacesComponent } from './spaces.component';
import { SpaceComponent } from './space/space.component';

@NgModule({
  imports: [
    CommonModule,
    SpacesRoutingModule,
    SharedModule
  ],
  declarations: [SpacesComponent, SpaceComponent]
})
export class SpacesModule { }
