import { Directive, ViewContainerRef, Input, ElementRef, NgZone, ViewChild, Output, EventEmitter } from '@angular/core'
import { FormControl } from '@angular/forms'
import { } from 'googlemaps'
import { MapsAPILoader } from '@agm/core'
import { Address } from '@shared/models/address'


@Directive({
  selector: '[d-sn-address]'
})

export class SNAddressDirective {

  addressEvent = new EventEmitter()

  constructor(
    private viewContainerRef: ViewContainerRef,
    private mapsAPILoader: MapsAPILoader,
    private ngZone       : NgZone
  ) { 

    this.addressEvent.emit(
      this.mapsAPILoader.load().then(() => {
        let autocomplete = new google.maps.places.Autocomplete(this.viewContainerRef.element.nativeElement, {})
        autocomplete.addListener("place_changed",() => {
          this.ngZone.run(() => {
            var addressModel = new Address
            let place: google.maps.places.PlaceResult = autocomplete.getPlace()
            let number: string
            if (place.geometry === undefined || place.geometry === null) {
              return;
            } else {
              addressModel.lng = place.geometry.location.lng();
              addressModel.lat = place.geometry.location.lat();
              place.address_components.map(address => {
                address.types.map(type => {
                  switch (type) {
                    case "postal_code":
                      return (addressModel.postalCode = address.long_name)
                    case "street_number":
                      return (number = address.short_name)
                    case "country":
                      addressModel.country = address.long_name;
                      addressModel.country = address.short_name
                    case "locality":
                      return (addressModel.city = address.long_name)
                    case "route":
                      return (addressModel.street1 = number + " " + address.long_name)
                    case "administrative_area_level_1":
                      return (addressModel.state = address.short_name)
                  }
                })
              })
            }
          })
        })
      })
    
    )

  }

}