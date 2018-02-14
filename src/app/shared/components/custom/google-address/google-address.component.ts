import {Component, ElementRef, NgZone, ViewChild, Output, Input} from '@angular/core'
import { FormControl } from '@angular/forms'
import { } from 'googlemaps'
import { MapsAPILoader } from '@agm/core'
import { AddressModel } from '@shared/models/address.model'
/**
 *  COMPONENT USE DESCRIPTION
 *  COMPONENT TO ACCESS GOOGLE API - RETURNING ADDRESS INFORMATION (ADDRESS MODEL).
 *  Inputs
 *  placeholder:     Placeholder information.
 *  Output
 *  address:         Address Information returned from google maps. (AddressModel)
 */
@Component({
  selector: 'sn-google-address',
  templateUrl: './google-address.component.html',
  styleUrls: ['./google-address.component.scss']
})

export class GoogleAddressComponent {
  @Input()  placeholder  : string
  @Output() address      : AddressModel
  @ViewChild("search")
  public searchElementRef: ElementRef

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone       : NgZone
  ) {}

  ngOnInit() {
    
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {})
      autocomplete.addListener("place_changed",() => {
        this.ngZone.run(() => {
          this.address = new AddressModel
          let place: google.maps.places.PlaceResult = autocomplete.getPlace()
          let number: string
          if (place.geometry === undefined || place.geometry === null) {
            return;
          } else {
            this.address.lng = place.geometry.location.lng();
            this.address.lat = place.geometry.location.lat();
            place.address_components.map(address => {
              address.types.map(type => {
                switch (type) {
                  case "postal_code":
                    return (this.address.postalCode = address.long_name)
                  case "street_number":
                    return (number = address.short_name)
                  case "country":
                    this.address.countryName = address.long_name;
                    this.address.countryCodeAlpha2 = address.short_name
                  case "locality":
                    return (this.address.locality = address.long_name)
                  case "route":
                    return (this.address.streetAddress = number + " " + address.long_name)
                  case "administrative_area_level_1":
                    return (this.address.region = address.short_name)
                }
              })
            })
          }
        })
      })
    })
  }
}




