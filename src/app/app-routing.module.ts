import { NgModule } from '@angular/core';
import { RouterModule }  from '@angular/router';
import { Routes } from '@angular/router';

import {
  SignInComponent,
  SignUpComponent,
  LayoutComponent,
  ForgotPasswordComponent
} from '@shared/components'

import {
  UserListComponent
} from '@features/users'

import {
  HomeComponent
} from '@features/pages/home/home.component'

import {
  GeneralComponent
} from '@features/listings/general/general.component'

const appRoutes: Routes = [
  { path: 'sign-in', component: SignInComponent },
  { path: 'register', component: SignUpComponent },
  { path: '',
    component: LayoutComponent,
    // canActivate: [AuthGuard, AuthGuardVerified],
    children: [
      { path: 'home', component: HomeComponent },
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'listings', component: GeneralComponent }
    ] 
  },
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
