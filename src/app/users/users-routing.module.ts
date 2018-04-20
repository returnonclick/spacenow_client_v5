import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { ProfileContainerComponent } from '@app/users/profile-container/profile-container.component'
import { SpacesComponent } from '@app/users/spaces/spaces.component'
import { CalendarComponent } from '@app/users/calendar/calendar.component'
import { CheckoutComponent } from '@app/users/checkout/checkout.component'
import { BookingsComponent } from '@app/users/bookings/bookings.component'
import { BookingRequestsComponent } from '@app/users/booking-requests/booking-requests.component'

const routes: Routes = [
  { path: 'my-profile', component: ProfileContainerComponent },
  { path: 'my-spaces', component: SpacesComponent },
  { path: 'my-calendar', component: CalendarComponent },
  { path: 'my-bookings', component: BookingsComponent },
  { path: 'booking-requests', component: BookingRequestsComponent },
  { path: 'booking-requests/:id', component: BookingRequestsComponent },
  { path: 'booking-requests/:id/:action', component: BookingRequestsComponent },
  { path: 'checkout/:id', component: CheckoutComponent },
  { path: '', redirectTo: '/my-profile', pathMatch: 'full' },
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class UsersRoutingModule { }
