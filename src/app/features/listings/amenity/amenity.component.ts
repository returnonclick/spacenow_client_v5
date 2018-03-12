import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core'
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { Router, ActivatedRoute } from "@angular/router"
import { forkJoin } from "rxjs/observable/forkJoin";

import * as fromRoot from '@core/store'
import * as listingActions from '@core/store/listings/actions/listing'
import { ListingEffects } from '@core/store/listings/effects/listing'

import { Space } from '@shared/models/space'
import { Amenity } from '@shared/models/amenity'
import { Category } from '@shared/models/category'


@Component({
  selector: 'sn-listing-amenity',
  templateUrl: './amenity.component.html',
  styleUrls: ['./amenity.component.scss']
})

export class AmenityComponent {

  listing$: Observable<Space>
  listing: Space
  categories$: Observable<Category[]>
  categories: Category[]
  amenities$: Observable<Amenity[]>
  amenities: Amenity[]

  categoryAmenities: Amenity[]
  amenitiesValid: boolean = false
  amenityForm: FormGroup

  constructor(private _store: Store<fromRoot.State>,
              private _fb: FormBuilder,
              private listingEffects: ListingEffects,
              private router: Router
  ) {

    this.amenityForm = this._fb.group({
      amenities: this._fb.array([]),
    })

    this.categories$ = this._store.select( fromRoot.getAllCategories )
    this.categories$.subscribe(categories => {
      this.categories = categories
    })
  
    // TODO: Store the amenities themselves for each category (or use reference data)
    this.amenities$ = this._store.select( fromRoot.getAllAmenities )
    this.amenities$.subscribe(amenities => {
      this.amenities = amenities
    })

    this.listing$ = this._store.select( fromRoot.selectCurrentListing )
    this.listing$.subscribe(listing => {
      if (listing) {
        this.listing = listing
        this.amenitiesValid = true ? typeof listing.amenityIds !== 'undefined' : false

        // TODO: Change the Category, Amenity and listing model to reference data so: just bring listing
        // Wait while Observers are subscribed **
        setTimeout(() => this.loadAmenities(), 100)
        
      }
    })

  }

  loadAmenities() {

    // Load amenities according to category
    // TODO: Change when reference data
    var category = this.categories.find(x => x.id === this.listing.categoryId)
    this.categoryAmenities = this.amenities.filter(amenity => {
      return category.amenities.indexOf(amenity.id) !== -1
    })

    let formAmenities = this.amenityForm.get('amenities') as FormArray;

    if (this.listing.amenityIds) {
      // Load listing amenities when listing update
      this.categoryAmenities.forEach((amenity) => {
        formAmenities.push(new FormControl(this.listing.amenityIds.indexOf(amenity.id) !== -1))
      });
    } else { 
      // Set amenities array
      this.categoryAmenities.forEach((amenity) => {
        formAmenities.push(new FormControl(false))
      });
    }
    this.validateAmenity()
   
  }

  validateAmenity() {
    this.amenitiesValid = this.amenityForm.controls.amenities.value.find(item => item === true)
  }

  onSubmit() {

    // Store the array of amenityIds
    let result = Object.assign({}, 
      this.amenityForm.value, { 
        amenityIds: this.categoryAmenities
        .filter((x, i) => !!this.amenityForm.value.amenities[i]).map(a =>{
          return a.id
        })
      })
    
    // Remove provitional formControl
    delete result.amenities

    if(this.listing.id) {
      this._store.dispatch(new listingActions.Update( this.listing.id, result ))
    }

    this.router.navigate(['listing', this.listing.id, 'specification'])
  }

    // TODO: Change this function for 'routerLink' in 'back-button' of price.component.html
    back() {
      this.router.navigate(['listing', this.listing.id, 'category'])
    }
 
}
 