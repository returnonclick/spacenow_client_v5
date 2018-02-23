import { Component, OnInit, AfterViewInit } from '@angular/core'
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material'

import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { User } from '@shared/models/user'

import * as actions from '@core/store/auth/actions/auth'
import * as fromRoot from '@core/store'

@Component({
  selector: 'sn-profile',
  templateUrl: './profile.component.html',
  styleUrls: [ './profile.component.scss' ]
})
export class ProfileComponent implements AfterViewInit{

  message: string = 'Snack Bar opened.';
  actionButtonLabel: string = 'Retry';
  action: boolean = false;
  setAutoHide: boolean = true;
  autoHide: number = 10000;
  addExtraClass: boolean = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  users$: Observable<User[]>

  constructor(
    public snackBar: MatSnackBar,
    private _store: Store<fromRoot.State>
  ) {
    this._store.select(fromRoot.getSelectedUser)
  }

  ngAfterViewInit() {

    this.users$.subscribe(users => {
      // console.log(users)
      if ( !users[0].isVerified )
        this.open()
    })

  }

  open() {
    let config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.setAutoHide ? this.autoHide : 0;
    config.panelClass = this.addExtraClass ? ['party'] : undefined;
    this.snackBar.open(this.message, this.action ? this.actionButtonLabel : undefined, config);
  }

}

