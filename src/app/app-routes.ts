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

export const appRoutes: Routes = [
    { path: 'sign-in', component: SignInComponent },
    { path: 'register', component: SignUpComponent },
    { path: '',
      component: LayoutComponent,
      // canActivate: [AuthGuard, AuthGuardVerified],
      children: [
        { path: 'users', component: UserListComponent }
      ] 
    },
    { path: '**', redirectTo: '/page-not-found', pathMatch: 'full' },
    // { path: 'page-not-found', component:  }
  ]