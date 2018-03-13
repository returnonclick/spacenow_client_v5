import { NgModule } from '@angular/core';
import { RouterModule }  from '@angular/router';
import { Routes } from '@angular/router';

import {
  AuthMenuComponent,
  SignInComponent,
  SignUpComponent,
  LayoutComponent,
  ForgotPasswordComponent
} from '@shared/components'

import { HomeComponent } from '@features/pages/home/home.component'
import { GeneralComponent } from '@features/listings/general/general.component'
import { MySpacesComponent } from '@features/my-spaces/my-spaces.component'
import { MyCalendarComponent } from '@features/my-calendar/my-calendar.component'
import { MyFavoritesComponent } from '@features/my-favorites/my-favorites.component'
import { SearchComponent } from '@features/search/search.component'

const appRoutes: Routes = [
  { 
    path: 'app',
    component: LayoutComponent,
    children: [
      { path: '', loadChildren: '@features/pages/pages.module#PagesModule' },
      { path: 'listings', loadChildren: '@features/listings/listings.module#ListingModule' },
      { path: 'profile', loadChildren: '@features/users/users.module#UsersModule' },
      { path: 'auth-menu', component: AuthMenuComponent, outlet: 'sidenav' },
      { path: 'sign-in', component: SignInComponent, outlet: 'sidenav' },
      { path: 'register', component: SignUpComponent, outlet: 'sidenav' },
      { path: 'forgot-password', component: ForgotPasswordComponent, outlet: 'sidenav' }
    ]
  },
  //{ path: 'profile', loadChildren: '@features/users/users.module#UsersModule' },
  { path: '', redirectTo: '/app', pathMatch: 'full' },
  // { path: 'my-spaces', component: MySpacesComponent },
  // { path: 'my-calendar', component: MyCalendarComponent },
 
  { path: '**', redirectTo: '/page-not-found', pathMatch: 'full' },
  { path: 'page-not-found', component:  SignInComponent}
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
