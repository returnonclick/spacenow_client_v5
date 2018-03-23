import { NgModule } from '@angular/core';
import { RouterModule }  from '@angular/router';
import { Routes } from '@angular/router';

import {
  SignInComponent,
  SignUpComponent,
  LayoutComponent,
  LayoutNoFooterComponent,
  ForgotPasswordComponent
} from '@shared/components'

import { AuthGuard } from '@core/store/auth/services';

import { HomeComponent } from '@app/home/home.component';
import { SearchComponent } from '@app/search/search.component';
import { SpaceComponent } from '@app/space/space.component';

const appRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { 
        path: '', 
        component: HomeComponent
      },
      { path: 'space', component: SpaceComponent },
      { path: 'space/:id', component: SpaceComponent },
    ]
  },
  {
    path: 'search',
    component: LayoutNoFooterComponent,
    children: [
      { path: '', component:  SearchComponent}
    ]
  },
  {
    path: 'listing',
    component: LayoutNoFooterComponent,
    //canActivate: [AuthGuard],
    children: [
      { path: '', loadChildren: '@app/listings/listings.module#ListingModule'}
    ]
  },
  {
    path: 'users',
    component: LayoutNoFooterComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', loadChildren: '@app/users/users.module#UsersModule'}
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
      // { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [ ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
