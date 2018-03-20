import { Component, ViewChild, ViewEncapsulation } from '@angular/core'
import { MatTabGroup, MatSnackBar } from '@angular/material'
import { Store } from '@ngrx/store'
import { Dictionary } from '@ngrx/entity/src/models'
import { Observable } from 'rxjs'

import * as moment from 'moment'

import { BookingSpace } from '@models/booking'
import { Category } from '@models/category'
import { Space, Price } from '@models/space'
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

  costBreakdown:       any[]
  hasAgreed:           boolean      = false
  hasConfirmedDetails: boolean      = false
  lastDeleted:         BookingSpace = null
  loadPayments:        any
  snackBarDuration:    number       = 1000

  constructor(
    private _store: Store<fromRoot.State>,
    private _snackbar: MatSnackBar,
  ) {
    this.cart$         = this._store.select(fromRoot.getAllBookingSpaces)
    this.categories$   = this._store.select(fromRoot.getCategoryEntities)
    this.spaces$       = this._store.select(fromRoot.getSpaceEntities)
    this.user$         = this._store.select(fromRoot.getAuthUser)
    this.pLoadPayments = new Promise((resolve, reject) => {
      this.loadPayments = resolve
    })

    this.cart$.subscribe(cart => {
      this._store.dispatch(new spaceActions.Select(
        cart.map(item => item.spaceId)
      ))
    })
    this.categories$.subscribe(categories => {
      this.categories = categories
    })
    this.spaces$.subscribe(spaces => {
      this.spaces = spaces
    })
    Observable.combineLatest(
      this.cart$,
      this.spaces$
    ).subscribe(([cart, spaces]) => {
      if(cart.length > 1 && Object.keys(spaces).length > 1) {
        let totalPrice = 0
        let tax        = 0
        for(let item of cart) {
          let space      = spaces[item.spaceId]
          let spacePrice = space.price[space.priceUnit] as Price
          let price      = 0
          if(space.priceUnit == 'hourly')
            price += spacePrice.price * (item.bookingDates[0].toHour - item.bookingDates[0].fromHour)
          else
            price += spacePrice.price * item.bookingDates.length

          totalPrice += price
          tax        += price * (spacePrice.tax.percent / 100.0)
        }

        this.costBreakdown = [
          {
            name: 'Accomodation',
            value: totalPrice
          },
          {
            name: 'Tax',
            value: tax
          },
          {
            name: 'Total',
            value: totalPrice + tax
          }
        ]
      }
    })
  }

  ngOnInit() {
    this._store.dispatch(new categoryActions.Query)

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
    this.hasAgreed             = true
    this.matTabs.selectedIndex = 1
  }

  confirmDetails() {
    this.hasConfirmedDetails   = true
    this.matTabs.selectedIndex = 2
    this.loadPayments(true)
  }

  viewSpace(spaceId) {
    window.open(`/app/space/${spaceId}`)
  }

  formatDate(d: Date, fromFmt: string = null, toFmt: string = 'DD MMM YYYY') {
    if(!fromFmt)
      return moment(d).format(toFmt)
    return moment(d, fromFmt).format(toFmt)
  }

  mapPriceUnit(priceUnit: string) {
    if(!priceUnit)
      return ''

    switch(priceUnit) {
      case 'daily':   return 'day'
      case 'weekly':  return 'week'
      case 'monthly': return 'month'
      default:        return ''
    }
  }

}