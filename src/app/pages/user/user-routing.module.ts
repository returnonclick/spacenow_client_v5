import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from '@angular/router'
import { LayoutModule } from '@app/layout/layout.module'
import { ProfileComponent } from './profile/profile.component'
import { UserComponent } from './user.component'

const routes: Routes = [
  {
      "path": "",
      "component": UserComponent,
      "children": [
          {
              "path": "",
              "component": ProfileComponent
          }
      ]
  },
  {
      "path": "booking-requests",
      "loadChildren": "./booking-requests/booking-requests.module#BookingRequestsModule"
  },
  {
      "path": "calendar",
      "loadChildren": "./calendar/calendar.module#CalendarModule"
  },
  {
      "path": "manage-bookings",
      "loadChildren": "./manage-bookings/manage-bookings.module#ManageBookingsModule"
  },
  {
      "path": "my-spaces",
      "loadChildren": "./my-spaces/my-spaces.module#MySpacesModule"
  }

];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    LayoutModule
  ],
  exports: [
    RouterModule
  ]
})
export class UserRoutingModule { }
