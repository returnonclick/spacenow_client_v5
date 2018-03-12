import { Component, ViewChild, ViewEncapsulation } from '@angular/core'
import { MatTabGroup, MatSnackBar } from '@angular/material'
import { Store } from '@ngrx/store'
import { Dictionary } from '@ngrx/entity/src/models'
import { Observable } from 'rxjs'

import { BookingSpace } from '@models/booking'
import { Category } from '@models/category'
import { Space } from '@models/space'
import { User } from '@models/user'

import * as fromRoot from '@core/store'
import * as cartActions from '@core/store/cart/actions/cart'
import * as categoryActions from '@core/store/categories/actions/category'
import * as spaceActions from '@core/store/spaces/actions/space'

@Component({
  selector: 'sn-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: [ './checkout.component.scss' ],
  encapsulation: ViewEncapsulation.None
})
export class CheckoutComponent {

  @ViewChild(MatTabGroup) matTabs: MatTabGroup

  cart$:         Observable<BookingSpace[]>
  categories$:   Observable<Dictionary<Category>>
  spaces$:       Observable<Dictionary<Space>>
  user$:         Observable<User>
  pLoadPayments: Promise<boolean>

  categories: Dictionary<Category>
  spaces:     Dictionary<Space>

  loadPayments:        any
  hasAgreed:           boolean      = false
  hasConfirmedDetails: boolean      = false
  lastDeleted:         BookingSpace = null
  snackBarDuration:    number       = 1000

  constructor(
    private _store: Store<fromRoot.State>,
    private _snackbar: MatSnackBar,
  ) {
    this.cart$         = this._store.select(fromRoot.getAllBookingSpaces)
    this.categories$   = this._store.select(fromRoot.getCategoryEntities)
    this.spaces$       = this._store.select(fromRoot.getSpaceEntities)
    this.user$         = this._store.select(fromRoot.getSelectedAuth)
    this.pLoadPayments = new Promise((resolve, reject) => {
      this.loadPayments = resolve
    })

    this.categories$.subscribe(categories => {
      this.categories = categories
    })
    this.spaces$.subscribe(spaces => {
      this.spaces = spaces
    })
  }

  ngOnInit() {
    this._store.dispatch(new categoryActions.Query)
    this._store.dispatch(new spaceActions.All)

    this.matTabs.selectedTabChange.subscribe(event => {
      if(!this.hasAgreed && event.index > 0) {
        this.matTabs.selectedIndex = 0
        this._snackbar.open('You must review and agree the contract', 'Close', {
          duration: this.snackBarDuration,
        })
      }
      else if(!this.hasConfirmedDetails && event.index > 1) {
        this.matTabs.selectedIndex = 1
        this._snackbar.open('Please confirm your account details', 'Close', {
          duration: this.snackBarDuration,
        })
      }
    })
  }

  removeItem(cartItem: BookingSpace) {
    this.lastDeleted = cartItem
    this._store.dispatch(new cartActions.Remove(cartItem.spaceId))

    this._snackbar.open('Listing deleted from cart', 'Undo' , {
      duration: this.snackBarDuration * 10,
    }).onAction().subscribe(() => {
      this._store.dispatch(new cartActions.Add(this.lastDeleted))
    })
  }

  agreeToContract() {
    this.hasAgreed = true
    this.matTabs.selectedIndex = 1
  }

  confirmDetails() {
    this.hasConfirmedDetails = true
    this.matTabs.selectedIndex = 2
    this.loadPayments(true)
  }

}
