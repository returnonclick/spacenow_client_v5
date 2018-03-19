import { NgModule }                   from '@angular/core';
import { Routes, RouterModule }       from '@angular/router';

import { ProfileContainerComponent }  from '@features/users/profile-container/profile-container.component'
import { SpacesComponent }            from '@features/users/spaces/spaces.component'
import { CalendarComponent }          from '@features/users/calendar/calendar.component'
import { FavoritesComponent }         from '@features/users/favorites/favorites.component'
 
const routes: Routes = [
  { path: 'my-profile', component: ProfileContainerComponent },
  { path: 'my-spaces', component: SpacesComponent },
  { path: 'my-caalendar', component: CalendarComponent },
  { path: 'my-favorites', component: FavoritesComponent },
  { path: '', redirectTo: '/my-profile', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
