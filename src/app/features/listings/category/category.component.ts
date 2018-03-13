import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core'
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { Router, ActivatedRoute } from "@angular/router"

import * as fromRoot from '@core/store'
import * as listingActions from '@core/store/listings/actions/listing'
import { ListingEffects } from '@core/store/listings/effects/listing'
import * as categoryActions from '@core/store/categories/actions/category'

import { Space } from '@shared/models/space'
import { Category } from '@shared/models/category'


@Component({
  selector: 'sn-listing-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})

export class CategoryComponent {
  
  listing$: Observable<Space>
  listing: Space
  categories$: Observable<Category[]>

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

    if(this.listing.id) {
      this._store.dispatch(new listingActions.Update( this.listing.id, this.categoryForm.value ))
    }

    this.router.navigate(['listing', this.listing.id, 'address'])
  }

}
   