import { Component, OnInit, OnChanges } from '@angular/core'
import { Router, ActivatedRoute, Params } from '@angular/router'

import { Store, select } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'
import { Profile } from '@shared/models/profile'
import { User } from '@shared/models/user'

import * as actions from '@core/store/users-profile/actions/user-profile'
import * as fromRoot from '@core/store'

@Component({
  selector: 'sn-profile-container',
  templateUrl: './profile-container.component.html',
  styleUrls: ['./profile-container.component.scss']
})
export class ProfileContainerComponent implements OnInit {

  isLoading$: Observable<boolean>
  authId$: Observable<string>
  authUser$: Observable<User>
  userProfile$: Observable<Profile>

  constructor(
    private _store: Store<fromRoot.State>,
    private route: ActivatedRoute
  ) {

    this.isLoading$ = this._store.pipe(select(fromRoot.getIsLoadingProfile))
    this.authId$ = this._store.pipe(select(fromRoot.getSelectedAuthId))
    this.userProfile$ = this._store.pipe(select(fromRoot.getSelectedUserProfile))
    this.authUser$ = this._store.pipe(select(fromRoot.getSelectedAuth))

   }

  ngOnInit() {

    this.authId$.subscribe(
      id => this._store.dispatch(new actions.Query(id))
    )

  }

  getImages(event) {
    console.log(event)
  }

}
