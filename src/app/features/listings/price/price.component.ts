import { Component, Input, Output, EventEmitter, OnInit, OnChanges, ViewChild, ComponentFactoryResolver, Type, ChangeDetectorRef } from '@angular/core'
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { Router, ActivatedRoute } from "@angular/router"
import { SNPriceDirective } from './price.directive'

import * as fromRoot from '@core/store'
import * as listingActions from '@core/store/listings/actions/listing'
import { ListingEffects } from '@core/store/listings/effects/listing'

import { Price } from '@shared/models/space'
import { Space } from '@shared/models/space'
import { AddPriceComponent } from './add-price.component'

import {
    HourlyComponent,
    DailyComponent,
    WeeklyComponent,
    MonthlyComponent
} from './'


@Component({
  selector: 'sn-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.scss']
})

export class PriceComponent {

    listing$: Observable<Space>
    listing: Space
    priceForm: FormGroup

    priceUnits = [
        { value: 'hourly', display: 'Price per hour' },
        { value: 'daily', display: 'Price per day' },
        { value: 'weekly', display: 'Price per week' },
        { value: 'monthly', display: 'Price per month' }
    ]

    @ViewChild(SNPriceDirective) snPriceHost: SNPriceDirective;
    
    componentUnit: { [key: string]: Type<any> } = {
        daily: DailyComponent,
        weekly: WeeklyComponent,
        monthly: MonthlyComponent,
        hourly: HourlyComponent
    }
    
    constructor(private componentFactoryResolver: ComponentFactoryResolver,
                private _store: Store<fromRoot.State>,
                private _fb: FormBuilder,
                private listingEffects: ListingEffects,
                private router: Router,
                private cdRef: ChangeDetectorRef
            ) 
    {

        this.priceForm = this._fb.group({
            priceUnit: ['', Validators.required ]
        })

        this.listing$ = this._store.select( fromRoot.selectCurrentListing )
        this.listing$.subscribe(listing => {
            if (listing) {
              this.listing = listing
              this.createForm()
            }
        })

    }

    ngAfterViewChecked() {
        this.cdRef.detectChanges();
    }
 
    createForm() {

        this.priceForm = this._fb.group({
            priceUnit: this.listing.priceUnit
        })
        // TODO: wait untill this.snPriceHost is ready to loadComponent() (?)
        setTimeout(() => this.loadComponent(), 100)
        
    }

    loadComponent() {
        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.componentUnit[this.priceForm.controls.priceUnit.value])
        let viewContainerRef = this.snPriceHost.viewContainerRef
        viewContainerRef.clear()
        let componentRef = viewContainerRef.createComponent(componentFactory);

        (<AddPriceComponent>componentRef.instance).parentForm = this.priceForm;
        if (this.priceForm.controls.priceUnit.value === this.listing.priceUnit) {
            (<AddPriceComponent>componentRef.instance).inPriceI = this.listing.price;
        }
            
        
    }

    onSubmit() {
        
        this.priceForm.updateValueAndValidity()

        if (this.listing.id) {
            this._store.dispatch(new listingActions.Update( this.listing.id, this.priceForm.value ))
        }

        this.router.navigate(['listing', this.listing.id, 'category'])
    }

    // TODO: Change this function for 'routerLink' in 'back-button' of price.component.html
    back() {
        this.router.navigate(['listing', this.listing.id, 'title'])
    }

}