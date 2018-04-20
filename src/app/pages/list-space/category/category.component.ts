import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core'
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms'
import { Store, select } from '@ngrx/store'
import { Observable } from 'rxjs'
import { Router, ActivatedRoute } from "@angular/router"

import * as fromRoot from '@core/store'
import * as listingActions from '@core/store/listings/actions/listing'
import { ListingEffects } from '@core/store/listings/effects/listing'
import * as categoryActions from '@core/store/categories/category.action'

import { Space } from '@shared/models/space'
import { Category } from '@shared/models/category'
import { User } from '@models/user'


@Component({
  selector: 'sn-listing-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})

export class CategoryComponent {
  
  listing$: Observable<Space>
  listing: Space
  categories$: Observable<Category[]>
  authUser$: Observable<User>
  authUser: User

  categoryForm: FormGroup

  constructor(private _store: Store<fromRoot.State>,
              private _fb: FormBuilder,
              private listingEffects: ListingEffects,
              private router: Router
  ) {

    this.categoryForm = this._fb.group({
      categoryId: ['', Validators.required ]
    })

    this.listing$ = this._store.select( fromRoot.selectCurrentListing )
    this.listing$.subscribe(listing => {
      if (listing) {
        this.listing = listing
        this.createForm()
      } else {
        this.listing = new Space()
        this.createForm()
      }
    })

    this.authUser$ = this._store.pipe(select(fromRoot.getAuthUser))
    this.authUser$.subscribe(
      (user) => {
        if (user) {
          this.authUser = user
        }
      })

    // Call this action here or in container?
    this._store.dispatch(new categoryActions.Query())
    this.categories$ = this._store.select( fromRoot.getAllCategories )

  }

  createForm() {
    this.categoryForm = this._fb.group({
      categoryId: this.listing.categoryId
    })
  }

  onSubmit() {

    this.categoryForm.updateValueAndValidity()
    let result = this.categoryForm.value

    if(this.listing.id) {

      this._store.dispatch(new listingActions.Update( this.listing.id, result ))
      this.router.navigate(['listing', this.listing.id, 'address'])

    } else {

      // Generate random alphanumeric listing ID 
      var m = 21, listingId = '', r = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      for (var i=0; i < m; i++) { listingId += r.charAt(Math.floor(Math.random()*r.length)); }

      // Store listing ownerUid and listingId when it's a new listing
      result = Object.assign({}, this.listing, { ownerUid: this.authUser.uid, id: listingId, categoryId: this.categoryForm.value.categoryId })

      this._store.dispatch(new listingActions.Create( result ))

      this.router.navigate(['listing', listingId, 'address'])

    }
  }

}
   