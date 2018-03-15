import { NgModule } from '@angular/core';
import { RouterModule }  from '@angular/router';
import { Routes } from '@angular/router';

import {
  SignInComponent,
  SignUpComponent,
  LayoutComponent,
  ForgotPasswordComponent
} from '@shared/components'

import { AuthGuard } from '@core/store/auth/services';

const appRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
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
  { path: 'sign-in', component: SignInComponent },
  { path: 'register', component: SignUpComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: '**', redirectTo: '/page-not-found', pathMatch: 'full' },
  { path: 'page-not-found', component:  SignInComponent}
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
