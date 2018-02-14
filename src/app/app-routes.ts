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
  GeneralComponent
} from '@features/listings/general/general.component'

export const appRoutes: Routes = [
    { path: 'sign-in', component: SignInComponent },
    { path: 'register', component: SignUpComponent },
    { path: '',
      component: LayoutComponent,
      // canActivate: [AuthGuard, AuthGuardVerified],
      children: [
        { path: 'users', component: UserListComponent },
        { path: 'listings', component: GeneralComponent }
      ] 
    },
    { path: '**', redirectTo: '/page-not-found', pathMatch: 'full' },
    // { path: 'page-not-found', component:  }
  ]