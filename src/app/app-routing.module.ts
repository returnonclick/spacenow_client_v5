import { NgModule } from '@angular/core';
import { RouterModule }  from '@angular/router';
import { Routes } from '@angular/router';

import {
  SignInComponent,
  SignUpComponent,
  // LayoutComponent,
  ForgotPasswordComponent
} from '@shared/components'

import { LayoutComponent } from '@shared/components/theme/layout/layout.component'

import { UserListComponent } from '@features/users'
import { HomeComponent } from '@features/pages/home/home.component'
import { MySpacesComponent } from '@features/my-spaces/my-spaces.component'
import { MyCalendarComponent } from '@features/my-calendar/my-calendar.component'
// import { SpaceComponent } from '@features/spaces/space/space.component'

const appRoutes: Routes = [
  // { path: 'layout', component: LayoutComponent },
  // { path: 'sign-in', component: SignInComponent },
  // { path: 'register', component: SignUpComponent },
  { path: '', component: LayoutComponent,
    // canActivate: [AuthGuard, AuthGuardVerified],
    children: [
      { path: 'home', component: HomeComponent },
      // { path: 'my-spaces', component: MySpacesComponent },
      // { path: 'my-calendar', component: MyCalendarComponent },
      // { path: 'my-calendar', component: MyCalendarComponent },
      // { path: 'space', component: SpaceComponent },
      { path: 'spaces', loadChildren: 'app/features/spaces/spaces.module#SpacesModule'},
      { path: 'listings', loadChildren: 'app/features/listings/listings.module#ListingModule'},
      { path: '', redirectTo: '/home', pathMatch: 'full' },
    ]
  },
  // ...spacesRoutes,
  { path: '**', redirectTo: '/page-not-found', pathMatch: 'full' },
  // { path: 'page-not-found', component:  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      // { enableTracing: true } // <-- debugging purposes only
    )
  ],
  // providers: [ appRoutingProviders ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
