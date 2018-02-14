import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// Angularfire2 and Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';

// @ngrx
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

// 3rd party packages
import { ToastModule } from 'ng2-toastr/ng2-toastr'; // For notification

// TT. Required for material animation
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { SharedModule } from '@shared/shared.module';
import { CoreModule } from '@core/core.module';
import { FeatureModule } from '@features/feature.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { reducers, metaReducers } from '@core/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, // TT. required for material2/animation
    SharedModule,
    CoreModule.forRoot(),
    FeatureModule.forRoot(),
    RouterModule,

    EffectsModule.forRoot([]),

    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,

    ToastModule.forRoot(),

    AppRoutingModule,

    StoreModule.forRoot(reducers, { metaReducers }),

    !environment.production ? StoreDevtoolsModule.instrument() : [],

  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
