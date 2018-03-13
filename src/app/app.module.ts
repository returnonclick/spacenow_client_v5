import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Angularfire2 and Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { environment } from '../environments/environment';

// @ngrx
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';

// 3rd party packages
import { ToastModule } from 'ng2-toastr/ng2-toastr'; // For notification

// TT. Required for material animation
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { SharedModule } from '@shared/shared.module';
import { CoreModule } from '@core/core.module';


import { HomeComponent } from '@features/pages/home/home.component'
import { LayoutComponent } from '@shared/components/theme/layout/layout.component'

// import { FeatureModule } from '@features/feature.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { reducers, metaReducers } from '@core/store';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LayoutComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, // TT. required for material2/animation
    SharedModule,
    CoreModule.forRoot(),

    // FeatureModule.forRoot(),

    
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    
    ToastModule.forRoot(),
    
    AppRoutingModule,
    
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([]),
    // StoreRouterConnectingModule,
    

    !environment.production ? StoreDevtoolsModule.instrument() : [],

  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
