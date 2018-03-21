import { NgModule }                   from '@angular/core';
import { Routes, RouterModule }       from '@angular/router';

import { ProfileContainerComponent }  from '@app/users/profile-container/profile-container.component'
import { SpacesComponent }            from '@app/users/spaces/spaces.component'
import { CalendarComponent }          from '@app/users/calendar/calendar.component'
import { FavoritesComponent }         from '@app/users/favorites/favorites.component'
import { CheckoutComponent }          from '@app/users/checkout/checkout.component'

const routes: Routes = [
  { path: 'my-profile', component: ProfileContainerComponent },
  { path: 'my-spaces', component: SpacesComponent },
  { path: 'my-calendar', component: CalendarComponent },
  { path: 'my-favorites', component: FavoritesComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: '', redirectTo: '/my-profile', pathMatch: 'full' }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
