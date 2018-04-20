import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FlexLayoutModule } from '@angular/flex-layout'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'

// Angularfire2 and Firebase
import { AngularFireModule } from 'angularfire2'
import { AngularFireDatabaseModule } from 'angularfire2/database'
import { AngularFirestoreModule } from 'angularfire2/firestore'
import { AngularFireStorageModule } from 'angularfire2/storage'
import { environment } from '@environments/environment'

// @ngrx
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { StoreRouterConnectingModule } from '@ngrx/router-store'
import { reducers, metaReducers } from '@core/store'

// 3rd party packages
import { ToastModule } from 'ng2-toastr/ng2-toastr' // For notification
import { AgmCoreModule } from '@agm/core'

import { AppRoutingModule } from '@app/app-routing.module'
import { CoreModule } from '@core/core.module'
import { LayoutModule } from '@app/layout/layout.module'
import { PagesRoutingModule } from '@app/pages/pages-routing.module'

import { AppComponent } from './app.component'
import { PagesComponent } from '@app/pages/pages.component'


import { BookingService } from '@core/store/bookings/services/booking'
import { MaterialModule } from '@app/shared/material.module'

@NgModule({
  declarations: [
    PagesComponent,
    AppComponent
  ],
  imports: [
    LayoutModule,
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    CoreModule,
    MaterialModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleApi,
      libraries: [
        'places',
        'geometry',
      ],
      language: "en-AU",
    }),

    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularFirestoreModule,

    ToastModule.forRoot(),

    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],

    AppRoutingModule,
    PagesRoutingModule

  ],
  providers: [],
  bootstrap: [ 
    AppComponent 
  ]
})
export class AppModule { }
