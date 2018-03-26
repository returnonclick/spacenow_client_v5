import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { FlexLayoutModule } from '@angular/flex-layout'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'

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

import { AgmCoreModule } from '@agm/core'

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { reducers, metaReducers } from '@core/store';
import { AuthGuard } from '@core/store/auth/services';

import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { SpaceComponent } from './space/space.component';

import { SpaceService } from '@core/store/spaces/services/space'
import { SpaceEffects } from '@core/store/spaces/effects/space'

import { SearchService } from '@core/store/search/services/search'
import { SearchEffects } from '@core/store/search/effects/search'

import { AmenityService } from '@core/store/amenities/services/amenity'
import { AmenityEffects } from '@core/store/amenities/effects/amenity'

import { CategoryService } from '@core/store/categories/services/category'
import { CategoryEffects } from '@core/store/categories/effects/category'

import { UserService } from '@core/store/users/services/user'
import { UserEffects } from '@core/store/users/effects/user'

import { CartEffects } from '@core/store/cart/effects/cart'
import { CartService } from '@core/store/cart/services/cart'

const COMPONENTS = [
  HomeComponent,
  SearchComponent,
  SpaceComponent
]

const SERVICES = [
  AmenityService,
  CartService,
  CategoryService,
  SpaceService,
  SearchService,
  UserService,
]

@NgModule({
  declarations: [
    AppComponent,
    ...COMPONENTS
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    BrowserModule,
    BrowserAnimationsModule, // TT. required for material2/animation
    SharedModule,
    CoreModule.forRoot(),

    AgmCoreModule.forRoot({
      apiKey: environment.googleApi,
      libraries: [
        'places'
      ]
    }),

    EffectsModule.forFeature([
      AmenityEffects,
      CartEffects,
      CategoryEffects,
      SpaceEffects,
      SearchEffects,
      UserEffects,
    ]),

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
  providers: [AuthGuard, ...SERVICES],
  bootstrap: [AppComponent]
})

export class AppModule { }
