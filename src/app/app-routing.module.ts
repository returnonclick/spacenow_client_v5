import { NgModule } from '@angular/core';
import { RouterModule }  from '@angular/router';
import { Routes } from '@angular/router';

import {
  SignInComponent,
  SignUpComponent,
  LayoutComponent,
  ForgotPasswordComponent
} from '@shared/components'

<<<<<<< HEAD
import { HomeComponent } from '@features/pages/home/home.component'
import { GeneralComponent } from '@features/listings/general/general.component'
import { MySpacesComponent } from '@features/my-spaces/my-spaces.component'
import { MyCalendarComponent } from '@features/my-calendar/my-calendar.component'
// import { MyFavoritesComponent } from '@features/my-favorites/my-favorites.component'
import { SearchComponent } from '@features/search/search.component'
import { SpaceComponent } from '@features/space/space.component'
import { CheckoutComponent } from '@features/checkout/checkout.component'
=======
import { AuthGuard } from '@core/store/auth/services';
>>>>>>> cd68e3ba4118e423b721f845bbe795f11c44c0bd

const appRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
<<<<<<< HEAD
      {
        path: 'app',
        children: [
          { path: '', loadChildren: '@features/pages/pages.module#PagesModule' },
          { path: 'listings', loadChildren: '@features/listings/listings.module#ListingModule' },
          { path: 'profile', loadChildren: '@features/users/users.module#UsersModule' },
          { path: 'auth-menu', component: AuthMenuComponent, outlet: 'sidenav' },
          { path: 'sign-in', component: SignInComponent, outlet: 'sidenav' },
          { path: 'register', component: SignUpComponent, outlet: 'sidenav' },
          { path: 'forgot-password', component: ForgotPasswordComponent, outlet: 'sidenav' },
          { path: 'space/:id', component: SpaceComponent },
          { path: 'checkout', component: CheckoutComponent },
          { path: 'my-spaces', component: MySpacesComponent },
          { path: 'my-calendar', component: MyCalendarComponent },
          // { path: 'my-favorites', component: MyFavoritesComponent },
        ]
      },
      { path: 'search', component: SearchComponent },
      { path: '', redirectTo: '/app', pathMatch: 'full' },
      { path: '**', redirectTo: '/page-not-found', pathMatch: 'full' },
      { path: 'page-not-found', component:  SignInComponent}
    ]
  }
=======
      { path: '', loadChildren: '@features/pages/pages.module#PagesModule' },
      { 
        path: 'listings', 
        loadChildren: '@features/listings/listings.module#ListingModule',
        canActivate: [AuthGuard]
      },
      { 
        path: 'users', 
        loadChildren: '@features/users/users.module#UsersModule' ,
        canActivate: [AuthGuard]
      },
      { path: 'sign-in', component: SignInComponent, outlet: 'sidenav' },
      { path: 'register', component: SignUpComponent, outlet: 'sidenav' },
      { path: 'forgot-password', component: ForgotPasswordComponent, outlet: 'sidenav' }
    ]
  },
  { path: '', redirectTo: '/app', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent },
  { path: 'register', component: SignUpComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: '', redirectTo: '/app', pathMatch: 'full' },
  { path: '**', redirectTo: '/page-not-found', pathMatch: 'full' },
  { path: 'page-not-found', component:  SignInComponent}
>>>>>>> cd68e3ba4118e423b721f845bbe795f11c44c0bd
]

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      //{ enableTracing: true } // <-- debugging purposes only
    )
  ],
  // providers: [ appRoutingProviders ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
