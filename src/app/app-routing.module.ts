import { NgModule } from '@angular/core';
import { appRoutes } from './app-routes'
import { RouterModule }  from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
       { enableTracing: true } // <-- debugging purposes only
    )
    
  ],
  // providers: [ appRoutingProviders ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
