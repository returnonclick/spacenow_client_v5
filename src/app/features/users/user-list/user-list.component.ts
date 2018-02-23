import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'

import { UserComponent } from '@features/users/user/user.component'
import { User } from '@shared/models/user'

import * as actions from '@core/store/users/actions/user'
import * as fromRoot from '@core/store'

@Component({
  selector: 'gen-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: [ './user-list.component.scss' ]
})
export class UserListComponent implements OnInit {

  users$: Observable<User[]>
  userMap: { [ key: string ]: any }

  itemComponent = UserComponent
  editComponent = '/user-profile'
  itemsTable = [
    {'name': 'photoURL', 'displayName': 'Profile Picture'},
    {'name': 'displayName', 'displayName': 'Display Name'},
    {'name': 'isVerified', 'displayName': 'Verified'},
  ];

  constructor(
    private _store: Store<fromRoot.State>
  ) {
    this.users$ = this._store.select(fromRoot.getAllUsers)
    this.users$.subscribe(users => {
      if(users)
        this.userMap = users.reduce((acc, curr) => {
          acc[curr.uid] = curr
          return acc
        }, {})
    })
  }

  ngOnInit() {
    this._store.dispatch(new actions.Query)
  }

  valMap = (key, obj) => {
    let value = obj[key] || ''
    switch(key) {
      case 'photoURL': return `<img matListAvatar src='${this.userMap[obj.uid].userData[0].photoURL}'>`
      case 'displayName': return this.userMap[obj.uid].userData[0].displayName
      case 'isVerified':  return this.userMap[obj.uid].isVerified ? 'Verified' : 'Unverified'
      default:          return (JSON.stringify(value) || '').replace(/\"/g, '')
    }
  }

}
