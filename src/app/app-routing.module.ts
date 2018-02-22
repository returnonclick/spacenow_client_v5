import { NgModule } from '@angular/core';
import { RouterModule }  from '@angular/router';
import { Routes } from '@angular/router';

import {
  SignInComponent,
  SignUpComponent,
  LayoutComponent,
  ForgotPasswordComponent
} from '@shared/components'

import { UserListComponent } from '@features/users'
import { HomeComponent } from '@features/pages/home/home.component'
import { GeneralComponent } from '@features/listings/general/general.component'
import { MySpacesComponent } from '@features/my-spaces/my-spaces.component'
import { MyCalendarComponent } from '@features/my-calendar/my-calendar.component'

const appRoutes: Routes = [
  { path: 'home',
    component: LayoutComponent,
    // canActivate: [AuthGuard, AuthGuardVerified],
    children: [
      { path: '', component: HomeComponent },
      { path: 'sign-in', component: SignInComponent, outlet: 'sidenav' },
      { path: 'register', component: SignUpComponent, outlet: 'sidenav' },
      { path: 'forgot-password', component: ForgotPasswordComponent, outlet: 'sidenav' },
      { path: 'listings', component: GeneralComponent },
      { path: 'my-spaces', component: MySpacesComponent },
      { path: 'my-calendar', component: MyCalendarComponent },
    ]
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
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
