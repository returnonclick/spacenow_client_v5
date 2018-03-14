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

    taxes = [
        {
          "country": "Country",
          "value": "Percent",
          "tax": "VAT or GST"
        },
        {
          "country": "Afghanistan",
          "value": "0",
          "tax": "VAT"
        },
        {
          "country": "Albania",
          "value": "20",
          "tax": "VAT"
        },
        {
          "country": "Algeria",
          "value": "17",
          "tax": "VAT"
        },
        {
          "country": "American Samoa",
          "value": "0",
          "tax": "VAT"
        },
        {
          "country": "Andorra",
          "value": "10",
          "tax": "VAT"
        },
        {
          "country": "Angola",
          "value": "17",
          "tax": "VAT"
        },
        {
          "country": "Anguilla",
          "value": "0",
          "tax": "VAT"
        },
        {
          "country": "Argentina",
          "value": "21",
          "tax": "VAT"
        },
        {
          "country": "Armenia",
          "value": "20",
          "tax": "VAT"
        },
        {
          "country": "Aruba",
          "value": "2",
          "tax": "VAT"
        },
        {
          "country": "Australia",
          "value": "10",
          "tax": "GST"
        },
        {
          "country": "Austria",
          "value": "20",
          "tax": "VAT"
        },
        {
          "country": "Azerbaijan",
          "value": "18",
          "tax": "VAT"
        },
        {
          "country": "Bahamas",
          "value": "5",
          "tax": "VAT"
        },
        {
          "country": "Bahrain",
          "value": "0",
          "tax": "VAT"
        },
        {
          "country": "Bangladesh",
          "value": "15",
          "tax": "VAT"
        },
        {
          "country": "Barbados",
          "value": "18",
          "tax": "VAT"
        },
        {
          "country": "Belarus",
          "value": "20",
          "tax": "VAT"
        },
        {
          "country": "Belgium",
          "value": "21",
          "tax": "VAT"
        },
        {
          "country": "Belize",
          "value": "13",
          "tax": "VAT"
        },
        {
          "country": "Benin",
          "value": "18",
          "tax": "VAT"
        },
        {
          "country": "Bermuda",
          "value": "0",
          "tax": "VAT"
        },
        {
          "country": "Bhutan",
          "value": "0",
          "tax": "VAT"
        },
        {
          "country": "Bolivia",
          "value": "13",
          "tax": "VAT"
        },
        {
          "country": "Bosnia and Herzegovina",
          "value": "17",
          "tax": "VAT"
        },
        {
          "country": "Botswana",
          "value": "12",
          "tax": "VAT"
        },
        {
          "country": "Brazil",
          "value": "25",
          "tax": "VAT"
        },
        {
          "country": "British Virgin Islands",
          "value": "0",
          "tax": "VAT"
        },
        {
          "country": "Brunei",
          "value": "0",
          "tax": "VAT"
        },
        {
          "country": "Bulgaria",
          "value": "20",
          "tax": "VAT"
        },
        {
          "country": "Burkina Faso",
          "value": "18",
          "tax": "VAT"
        },
        {
          "country": "Burundi",
          "value": "18",
          "tax": "VAT"
        },
        {
          "country": "Cambodia",
          "value": "10",
          "tax": "VAT"
        },
        {
          "country": "Cameroon",
          "value": "19",
          "tax": "VAT"
        },
        {
          "country": "Canada",
          "value": "15",
          "tax": "VAT"
        },
        {
          "country": "Cape Verde",
          "value": "15",
          "tax": "VAT"
        },
        {
          "country": "Cayman Islands",
          "value": "0",
          "tax": "VAT"
        },
        {
          "country": "Central African Republic",
          "value": "19",
          "tax": "VAT"
        },
        {
          "country": "Chad",
          "value": "0",
          "tax": "VAT"
        },
        {
          "country": "Chile",
          "value": "19",
          "tax": "VAT"
        },
        {
          "country": "China",
          "value": "17",
          "tax": "VAT"
        },
        {
          "country": "Colombia",
          "value": "19",
          "tax": "VAT"
        },
        {
          "country": "Comoros",
          "value": "0",
          "tax": "VAT"
        },
        {
          "country": "Congo",
          "value": "0",
          "tax": "VAT"
        },
        {
          "country": "Cook Islands",
          "value": "0",
          "tax": "VAT"
        },
        {
          "country": "Costa Rica",
          "value": "13",
          "tax": "VAT"
        },
        {
          "country": "Croatia",
          "value": "25",
          "tax": "VAT"
        },
        {
          "country": "Cuba",
          "value": "20",
          "tax": "VAT"
        },
        {
          "country": "Curaçao",
          "value": "0",
          "tax": "VAT"
        },
        {
          "country": "Cyprus",
          "value": "19",
          "tax": "VAT"
        },
        {
          "country": "Czech Republic",
          "value": "21",
          "tax": "VAT"
        },
        {
          "country": "Democratic Republic of the Congo",
          "value": "0",
          "tax": "VAT"
        },
        {
          "country": "Denmark",
          "value": "25",
          "tax": "VAT"
        },
        {
          "country": "Djibouti",
          "value": "0",
          "tax": "VAT"
        },
        {
          "country": "Dominica",
          "value": "0",
          "tax": "VAT"
        },
        {
          "country": "Dominican Republic",
          "value": "18",
          "tax": "VAT"
        },
        {
          "country": "Dubai",
          "value": "5",
          "tax": "VAT"
        },
        {
          "country": "Ecuador",
          "value": "15",
          "tax": "VAT"
        },
        {
          "country": "Egypt",
          "value": "14",
          "tax": "VAT"
        },
        {
          "country": "El Salvador",
          "value": "13",
          "tax": "VAT"
        },
        {
          "country": "Equatorial Guinea",
          "value": "0",
          "tax": "VAT"
        },
        {
          "country": "Eritrea",
          "value": "0",
          "tax": "VAT"
        },
        {
          "country": "Estonia",
          "value": "20",
          "tax": "VAT"
        },
        {
          "country": "Ethiopia",
          "value": "0",
          "tax": "VAT"
        },
        {
          "country": "F.S. Micronesia",
          "value": "0",
          "tax": "VAT"
        },
        {
          "country": "Falkland Islands",
          "value": "0",
          "tax": "VAT"
        },
        {
          "country": "Fiji",
          "value": "0",
          "tax": "VAT"
        },
        {
          "country": "Finland",
          "value": "24",
          "tax": "VAT"
        },
        {
          "country": "France",
          "value": "20",
          "tax": "VAT"
        },
        {
          "country": "Gabon",
          "value": "18",
          "tax": "VAT"
        },
        {
          "country": "Gambia",
          "value": "0",
          "tax": "VAT"
        },
        {
          "country": "Georgia",
          "value": "18",
          "tax": "VAT"
        },
        {
          "country": "Germany",
          "value": "19",
          "tax": "VAT"
        },
        {
          "country": "Ghana",
          "value": "0",
          "tax": "VAT"
        },
        {
          "country": "Gibraltar",
          "value": "0",
          "tax": "VAT"
        },
        {
          "country": "Greece",
          "value": "24",
          "tax": "VAT"
        },
        {
          "country": "Grenada",
          "value": "0",
          "tax": "VAT"
        },
        {
          "country": "Guatemala",
          "value": "12",
          "tax": "VAT"
        },
        {
          "country": "Guernsey",
          "value": "0",
          "tax": "VAT"
        },
        {
          "country": "Guinea",
          "value": "0",
          "tax": "VAT"
        },
        {
          "country": "Guinea-Bissau",
          "value": "0",
          "tax": "VAT"
        },
        {
          "country": "Guyana",
          "value": "16",
          "tax": "VAT"
        },
        {
          "country": "Haiti",
          "value": "0",
          "tax": "VAT"
        },
        {
          "country": "Honduras",
          "value": "0",
          "tax": "VAT"
        },
        {
          "country": "Hong Kong",
          "value": "0",
          "tax": "VAT"
        },
        {
          "country": "Hungary",
          "value": "27",
          "tax": "VAT"
        },
        {
          "country": "Iceland",
          "value": "24",
          "tax": "VAT"
        },
        {
          "country": "India",
          "value": "28",
          "tax": "VAT"
        },
        {
          "country": "Indonesia",
          "value": "10",
          "tax": "VAT"
        },
        {
          "country": "Iran",
          "value": "9",
          "tax": "VAT"
        },
        {
          "country": "Iraq",
          "value": "0",
          "tax": "VAT"
        },
        {
          "country": "Ireland",
          "value": "23",
          "tax": "VAT"
        },
        {
          "country": "Isle of Man",
          "value": "20",
          "tax": "VAT"
        },
        {
          "country": "Israel",
          "value": "17",
          "tax": "VAT"
        },
        {
          "country": "Italy",
          "value": "22",
          "tax": "VAT"
        },
        {
          "country": "Ivory Coast",
          "value": "0",
          "tax": "VAT"
        },
        {
          "country": "Jamaica",
          "value": "20",
          "tax": "VAT"
        },
        {
          "country": "Japan",
          "value": "8",
          "tax": "VAT"
        },
        {
          "country": "Jersey",
          "value": "5",
          "tax": "VAT"
        },
        {
          "country": "Jordan",
          "value": "16",
          "tax": "VAT"
        },
        {
          "country": "Kazakhstan",
          "value": "12",
          "tax": "VAT"
        },
        {
          "country": "Kenya",
          "value": "16",
          "tax": "VAT"
        },
        {
          "country": "Kiribati",
          "value": "0",
          "tax": "VAT"
        },
        {
          "country": "Kuwait",
          "value": "0",
          "tax": "VAT"
        },
        {
          "country": "Kyrgyzstan",
          "value": "0",
          "tax": "VAT"
        },
        {
          "country": "Laos",
          "value": "0",
          "tax": "VAT"
        },
        {
          "country": "Latvia",
          "value": "21",
          "tax": "VAT"
        },
        {
          "country": "Lebanon",
          "value": "10",
          "tax": "VAT"
        },
        {
          "country": "Lesotho",
          "value": "0",
          "tax": "VAT"
        },
        {
          "country": "Liberia",
          "value": "0",
          "tax": "VAT"
        },
        {
          "country": "Libya",
          "value": "0",
          "tax": "VAT"
        },
        {
          "country": "Liechtenstein",
          "value": "3",
          "tax": "VAT"
        },
        {
          "country": "Lithuania[citation needed",
          "value": "21",
          "tax": "VAT"
        },
        {
          "country": "Luxembourg",
          "value": "17",
          "tax": "VAT"
        },
        {
          "country": "Macau",
          "value": "0",
          "tax": "VAT"
        },
        {
          "country": "Macedonia",
          "value": "18",
          "tax": "VAT"
        },
        {
          "country": "Madagascar",
          "value": "0",
          "tax": "VAT"
        },
        {
          "country": "Malawi",
          "value": "0",
          "tax": "VAT"
        },
        {
          "country": "Malaysia",
          "value": "6",
          "tax": "VAT"
        },
        {
          "country": "Maldives",
          "value": "6",
          "tax": "VAT"
        },
        {
          "country": "Mali",
          "value": "0",
          "tax": "VAT"
        },
        {
          "country": "Malta",
          "value": "18",
          "tax": "VAT"
        },
        {
          "country": "Marshall Islands",
          "value": "4",
          "tax": "VAT"
        },
        {
          "country": "Mauritania",
          "value": "0",
          "tax": "VAT"
        },
        {
          "country": "Mauritius",
          "value": "15",
          "tax": "VAT"
        },
        {
          "country": "Mexico",
          "value": "16",
          "tax": "VAT"
        },
        {
          "country": "Moldova",
          "value": "20",
          "tax": "VAT"
        },
        {
          "country": "Monaco",
          "value": "20",
          "tax": "VAT"
        },
        {
          "country": "Mongolia",
          "value": "10",
          "tax": "VAT"
        },
        {
          "country": "Montenegro",
          "value": "19",
          "tax": "VAT"
        },
        {
          "country": "Montserrat",
          "value": "0",
          "tax": "VAT"
        },
        {
          "country": "Morocco",
          "value": "0",
          "tax": "VAT"
        },
        {
          "country": "Mozambique",
          "value": "0",
          "tax": "VAT"
        },
        {
          "country": "Myanmar",
          "value": "0",
          "tax": "VAT"
        },
        {
          "country": "Namibia",
          "value": "0",
          "tax": "VAT"
        },
        {
          "country": "Nauru",
          "value": "0",
          "tax": "VAT"
        },
        {
          "country": "Nepal",
          "value": "13",
          "tax": "VAT"
        },
        {
          "country": "Netherlands",
          "value": "21",
          "tax": "VAT"
        },
        {
          "country": "New Caledonia",
          "value": "0",
          "tax": "VAT"
        },
        {
          "country": "New Zealand",
          "value": "15",
          "tax": "GST"
        },
        {
          "country": "Nicaragua",
          "value": "0",
          "tax": "VAT"
        },
        {
          "country": "Niger",
          "value": "0",
          "tax": "VAT"
        },
        {
          "country": "Nigeria",
          "value": "5",
          "tax": "VAT"
        },
        {
          "country": "Niue",
          "value": "0",
          "tax": "VAT"
        },
        {
          "country": "Norfolk Island",
          "value": "0",
          "tax": "VAT"
        },
        {
          "country": "North Korea",
          "value": "4",
          "tax": "VAT"
        },
        {
          "country": "Norway",
          "value": "25",
          "tax": "VAT"
        },
        {
          "country": "Oman",
          "value": "5",
          "tax": "VAT"
        },
        {
          "country": "Pakistan",
          "value": "17",
          "tax": "VAT"
        },
        {
          "country": "Palau",
          "value": "0",
          "tax": "VAT"
        },
        {
          "country": "Palestine",
          "value": "15",
          "tax": "VAT"
        },
        {
          "country": "Panama",
          "value": "15)",
          "tax": "VAT"
        },
        {
          "country": "Papua New Guinea",
          "value": "0",
          "tax": "VAT"
        },
        {
          "country": "Paraguay",
          "value": "10",
          "tax": "VAT"
        },
        {
          "country": "Peru",
          "value": "18",
          "tax": "VAT"
        },
        {
          "country": "Philippines",
          "value": "12",
          "tax": "VAT"
        },
        {
          "country": "Pitcairn Islands",
          "value": "0",
          "tax": "VAT"
        },
        {
          "country": "Poland",
          "value": "23",
          "tax": "VAT"
        },
        {
          "country": "Portugal",
          "value": "23",
          "tax": "VAT"
        },
        {
          "country": "Puerto Rico",
          "value": "12",
          "tax": "VAT"
        },
        {
          "country": "Qatar",
          "value": "0",
          "tax": "VAT"
        },
        {
          "country": "Romania",
          "value": "19",
          "tax": "VAT"
        },
        {
          "country": "Russia",
          "value": "18",
          "tax": "VAT"
        },
        {
          "country": "Rwanda",
          "value": "0",
          "tax": "VAT"
        },
        {
          "country": "Saint Kitts and Nevis",
          "value": "0",
          "tax": "VAT"
        },
        {
          "country": "Saint Lucia",
          "value": "0",
          "tax": "VAT"
        },
        {
          "country": "Saint Pierre and Miquelon",
          "value": "0",
          "tax": "VAT"
        },
        {
          "country": "Saint Vincent and the Grenadines",
          "value": "0",
          "tax": "VAT"
        },
        {
          "country": "Samoa",
          "value": "0",
          "tax": "VAT"
        },
        {
          "country": "San Marino",
          "value": "17",
          "tax": "VAT"
        },
        {
          "country": "Sark",
          "value": "0",
          "tax": "VAT"
        },
        {
          "country": "Saudi Arabia",
          "value": "5",
          "tax": "VAT"
        },
        {
          "country": "Senegal",
          "value": "20",
          "tax": "VAT"
        },
        {
          "country": "Serbia",
          "value": "20",
          "tax": "VAT"
        },
        {
          "country": "Seychelles",
          "value": "0",
          "tax": "VAT"
        },
        {
          "country": "Sierra Leone",
          "value": "0",
          "tax": "VAT"
        },
        {
          "country": "Singapore",
          "value": "7",
          "tax": "VAT"
        },
        {
          "country": "Sint Maarten",
          "value": "0",
          "tax": "VAT"
        },
        {
          "country": "Slovakia",
          "value": "20",
          "tax": "VAT"
        },
        {
          "country": "Slovenia",
          "value": "22",
          "tax": "VAT"
        },
        {
          "country": "Solomon Islands",
          "value": "0",
          "tax": "VAT"
        },
        {
          "country": "Somalia",
          "value": "0",
          "tax": "VAT"
        },
        {
          "country": "South Africa",
          "value": "14",
          "tax": "VAT"
        },
        {
          "country": "South Korea",
          "value": "10",
          "tax": "VAT"
        },
        {
          "country": "South Sudan",
          "value": "0",
          "tax": "VAT"
        },
        {
          "country": "Spain",
          "value": "21",
          "tax": "VAT"
        },
        {
          "country": "Sri Lanka",
          "value": "12",
          "tax": "VAT"
        },
        {
          "country": "Sudan",
          "value": "0",
          "tax": "VAT"
        },
        {
          "country": "Suriname",
          "value": "0",
          "tax": "VAT"
        },
        {
          "country": "Swaziland",
          "value": "14",
          "tax": "VAT"
        },
        {
          "country": "Sweden",
          "value": "25",
          "tax": "VAT"
        },
        {
          "country": "Switzerland",
          "value": "8",
          "tax": "VAT"
        },
        {
          "country": "Syria",
          "value": "0",
          "tax": "VAT"
        },
        {
          "country": "São Tomé and Príncipe",
          "value": "0",
          "tax": "VAT"
        },
        {
          "country": "Taiwan",
          "value": "5",
          "tax": "VAT"
        },
        {
          "country": "Tajikistan",
          "value": "0",
          "tax": "VAT"
        },
        {
          "country": "Tanzania",
          "value": "0",
          "tax": "VAT"
        },
        {
          "country": "Thailand",
          "value": "7",
          "tax": "VAT"
        },
        {
          "country": "Timor-Leste",
          "value": "0",
          "tax": "VAT"
        },
        {
          "country": "Togo",
          "value": "0",
          "tax": "VAT"
        },
        {
          "country": "Tokelau",
          "value": "0",
          "tax": "VAT"
        },
        {
          "country": "Tonga",
          "value": "0",
          "tax": "VAT"
        },
        {
          "country": "Trinidad and Tobago",
          "value": "13",
          "tax": "VAT"
        },
        {
          "country": "Tunisia",
          "value": "18",
          "tax": "VAT"
        },
        {
          "country": "Turkey",
          "value": "18",
          "tax": "VAT"
        },
        {
          "country": "Turkmenistan",
          "value": "0",
          "tax": "VAT"
        },
        {
          "country": "Turks and Caicos Islands",
          "value": "0",
          "tax": "VAT"
        },
        {
          "country": "Tuvalu",
          "value": "0",
          "tax": "VAT"
        },
        {
          "country": "U.S. Virgin Islands",
          "value": "0",
          "tax": "VAT"
        },
        {
          "country": "Uganda",
          "value": "0",
          "tax": "VAT"
        },
        {
          "country": "Ukraine",
          "value": "20",
          "tax": "VAT"
        },
        {
          "country": "United Arab Emirates",
          "value": "5",
          "tax": "VAT"
        },
        {
          "country": "United Kingdom",
          "value": "20",
          "tax": "VAT"
        },
        {
          "country": "United States",
          "value": "12",
          "tax": "VAT"
        },
        {
          "country": "Uruguay",
          "value": "22",
          "tax": "VAT"
        },
        {
          "country": "Uzbekistan",
          "value": "20",
          "tax": "VAT"
        },
        {
          "country": "Vanuatu",
          "value": "0",
          "tax": "VAT"
        },
        {
          "country": "Venezuela",
          "value": "12",
          "tax": "VAT"
        },
        {
          "country": "Vietnam",
          "value": "10",
          "tax": "VAT"
        },
        {
          "country": "Yemen",
          "value": "2",
          "tax": "VAT"
        },
        {
          "country": "Zambia",
          "value": "18",
          "tax": "VAT"
        },
        {
          "country": "Zimbabwe",
          "value": "0",
          "tax": "VAT"
        }
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

        this.router.navigate(['app/listings', this.listing.id, 'booking'])
    }

    // TODO: Change this function for 'routerLink' in 'back-button' of price.component.html
    back() {
        this.router.navigate(['app/listings', this.listing.id, 'specification'])
    }

}