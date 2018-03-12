import { Component, OnInit, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core'
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { Router, ActivatedRoute } from "@angular/router"
import { forkJoin } from "rxjs/observable/forkJoin";

import * as fromRoot from '@core/store'
import * as listingActions from '@core/store/listings/actions/listing'
import { ListingEffects } from '@core/store/listings/effects/listing'

import { Space } from '@shared/models/space'
import { ListingSpecification } from '@shared/models/listing-specification'
import { Category } from '@shared/models/category'


@Component({
  selector: 'sn-listing-specification',
  templateUrl: './specification.component.html',
  styleUrls: ['./specification.component.scss']
})

export class SpecificationComponent {

  listing$: Observable<Space>
  listing: Space
  categories$: Observable<Category[]>
  categories: Category[]
  specifications$: Observable<ListingSpecification[]>
  specifications: ListingSpecification[]

  categorySpecs: ListingSpecification[]
  specificationForm: FormGroup

  constructor(private _store: Store<fromRoot.State>,
              private _fb: FormBuilder,
              private listingEffects: ListingEffects,
              private router: Router,
              private cdRef: ChangeDetectorRef
  ) {

    this.specificationForm = this._fb.group({
      specifications: this._fb.group({}),
    })

    this.categories$ = this._store.select( fromRoot.getAllCategories )
    this.categories$.subscribe(categories => {
      this.categories = categories
    })
  
    this.specifications$ = this._store.select( fromRoot.getAllListingSpecifications )
    this.specifications$.subscribe(specifications => {
      this.specifications = specifications
    })

    this.listing$ = this._store.select( fromRoot.selectCurrentListing )
    this.listing$.subscribe(listing => {
      if (listing) {
        this.listing = listing

        // TODO: Change the Category, Specification and listing model to reference data so: just bring listing
        // For now, Wait while Observers are subscribed **
        setTimeout(() => this.loadAmenities(), 100)
        
      }
    })

  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  loadAmenities() {

    // Load specifications according to category
    // TODO: Change when reference data to listing.category: all the data
    var category = this.categories.find(x => x.id === this.listing.categoryId)

    this.categorySpecs = this.specifications.filter(specification => {
      return category.specifications.indexOf(specification.id) !== -1
    })

     // Load categories specifications 
     let formGroupSpec = this.specificationForm.get('specifications') as FormGroup;
     this.categorySpecs.map(spec => formGroupSpec.addControl(spec.slug, new FormControl(this.listing.specifications ? this.listing.specifications[spec.slug] : null)))
   
  }

  onSubmit() {

    this.specificationForm.updateValueAndValidity()

    if(this.listing.id) {
      this._store.dispatch(new listingActions.Update( this.listing.id, this.specificationForm.value ))
    }

    this.router.navigate(['listing', this.listing.id, 'address'])
  }

    // TODO: Change this function for 'routerLink' in 'back-button' of price.component.html
    back() {
      this.router.navigate(['listing', this.listing.id, 'amenity'])
    }
 
}
 