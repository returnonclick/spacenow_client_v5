import { Component, ViewChild, ViewEncapsulation } from '@angular/core'
import { MatTabGroup, MatSnackBar } from '@angular/material'
import { ActivatedRoute } from '@angular/router'
import { Store } from '@ngrx/store'
import { Dictionary } from '@ngrx/entity/src/models'
import { Subject, Observable } from 'rxjs'

import * as moment from 'moment'

import { Booking } from '@models/booking'
import { Category } from '@models/category'
import { Space } from '@models/space'
import { ListingShortDetail } from '@models/listing-short-detail'
import { User } from '@models/user'

import * as fromRoot from '@core/store'
import * as bookingActions from '@core/store/bookings/actions/booking'
import * as categoryActions from '@core/store/categories/actions/category'
import * as spaceActions from '@core/store/spaces/actions/space'
import * as layoutActions from '@core/store/layouts/actions/layout'

@Component({
  selector: 'sn-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: [ './checkout.component.scss' ],
  encapsulation: ViewEncapsulation.None,
})
export class CheckoutComponent {

  @ViewChild(MatTabGroup) matTabs: MatTabGroup

  cart$:         Observable<Booking[]>
  categories$:   Observable<Dictionary<Category>>
  spaces$:       Observable<Dictionary<Space | ListingShortDetail>>
  stopper$:      Subject<boolean>
  user$:         Observable<User>
  pLoadPayments: Promise<boolean>

  categories: Dictionary<Category>
  spaces:     Dictionary<Space|ListingShortDetail>

  cart:                Booking[]
  costBreakdown:       any[]
  hasAgreed:           boolean = false
  hasConfirmedDetails: boolean = false
  loadPayments:        any
  snackBarDuration:    number  = 1000
  totalPrice:          number  = 0

  constructor(
    private _route:    ActivatedRoute,
    private _store:    Store<fromRoot.State>,
    private _snackbar: MatSnackBar,
  ) {
    this.cart$         = this._store.select(fromRoot.getAllBookings)
    this.categories$   = this._store.select(fromRoot.getCategoryEntities)
    this.spaces$       = this._store.select(fromRoot.getSpaceEntities)
    this.stopper$      = new Subject()
    this.user$         = this._store.select(fromRoot.getAuthUser)
    this.pLoadPayments = new Promise((resolve, reject) => {
      this.loadPayments = resolve
    })

    this.cart$.subscribe(cart => {
      this.cart = cart
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
      this.spaces$,
      this.categories$,
    ).subscribe(([cart, spaces, categories]) => {
      if(cart.length > 0 && Object.keys(spaces).length > 0 && Object.keys(categories).length > 0) {
        let totalPrice = 0
        let tax        = 0
        for(let item of cart) {
          let space    = spaces[item.spaceId] as Space
          let spaceCat = categories[space.categoryId]
          if(space) {
            let spacePrice = space.price
            let price      = 0
            if(space.priceUnit == 'hourly')
              price += spacePrice.price * (item.bookingDates[0].toHour - item.bookingDates[0].fromHour)
            else
              price += spacePrice.price * item.bookingDates.length

            price      *= (spaceCat.slug == 'desk_only' || spaceCat.slug == 'co-working-space') ? item.numGuests : 1
            totalPrice += price
            tax        += price * (space.tax.percent / 100.0)
          }
        }

        this.totalPrice    = totalPrice + tax
        this.costBreakdown = [
          { name: 'Accomodation', value: totalPrice },
          { name: 'Tax', value: tax },
          { name: 'Total', value: this.totalPrice },
        ]
      }
      else {
        this.costBreakdown = [
          { name: 'Accomodation', value: 0 },
          { name: 'Tax', value: 0 },
          { name: 'Total', value: 0 },
        ]
      }
    })
  }

  ngOnInit() {
    this._store.dispatch(new categoryActions.Query)
    this._store.dispatch(new layoutActions.SetLogoGreen)

    this._route.params
      .takeUntil(this.stopper$)
      .subscribe(params => {
        if(params.id)
          this._store.dispatch(new bookingActions.Select(params.id))
      })

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

  ngOnDestroy() {
    this.stopper$.next(true)
    this.stopper$.complete()
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
    window.open(`/space/${spaceId}`)
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
