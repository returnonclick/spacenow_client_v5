import { NgModule } from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';


//
// const authProviders = [
//   AuthGuardService,
//   FirebaseAuthService
// ];
//
// export const appRoutingProviders: any[] = [
//   authProviders,
//   CanDeactivateGuardService
// ];
//

const notFoundPageRoutes: Routes = [
  { path: '**', redirectTo: '/page-not-found', pathMatch: 'full' },
  { path: 'page-not-found', loadChildren: './features/page-not-found/page-not-found.module#PageNotFoundModule' }
];


// Lazy load layout module.
const homeRoutes: Routes = [
  { path: '', loadChildren: './features/layout/layout.module#LayoutModule' }
];


const postRoutes: Routes = [
  { path: 'blog', loadChildren: './features/posts/posts.module#PostsModule' }
]

const appRoutes: Routes = [
  ...homeRoutes,
  ...postRoutes,
  ...notFoundPageRoutes,
];


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
