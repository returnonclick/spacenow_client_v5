import { NgModule } from '@angular/core'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'

import { AngularFireDatabaseModule } from 'angularfire2/database'
import { AngularFireAuthModule } from 'angularfire2/auth'
import { AngularFirestoreModule } from 'angularfire2/firestore'

import { AuthService } from '@core/store/auth/services'
import { AuthEffects } from '@core/store/auth/effects/auth'

import { 
  NotifyService
} from './services/'


@NgModule({
  imports: [
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    EffectsModule.forFeature([AuthEffects]),
  ]
})

export class CoreModule {
  static forRoot() {
    return {
      ngModule: CoreModule,
      providers: [
        AuthService,
        NotifyService
      ]
    }
  }
}
