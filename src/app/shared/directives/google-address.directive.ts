import { Directive, ViewContainerRef, NgZone, Output, EventEmitter } from '@angular/core'
import { } from 'googlemaps'
import { MapsAPILoader } from '@agm/core'
import { Address } from '@shared/models/address'
/**
 *  DIRECTIVE DESCRIPTION
 *  DIRECTIVE TO ACCESS GOOGLE API - RETURNING ADDRESS INFORMATION (ADDRESS MODEL).
 *  Output
 *  address:         Address Information returned from google maps. (AddressModel)
 */
@Directive({
  selector: '[d-google-address]',
  host: {
    '(change)': 'sendAddress()'
  }
})

export class GoogleAddressDirective {

  address: Address
  @Output() addressEvent = new EventEmitter<any>()



  constructor(
    private viewContainerRef: ViewContainerRef,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {


      this.mapsAPILoader.load().then(() => {
        let autocomplete = new google.maps.places.Autocomplete(this.viewContainerRef.element.nativeElement, {})
        autocomplete.addListener("place_changed", () => {
          this.ngZone.run(() => {
            this.address = new Address
            let place: google.maps.places.PlaceResult = autocomplete.getPlace()
            let number: string = ''
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
                      this.address.countryCode = address.short_name
                      this.address.countryName = address.long_name
                    case "locality":
                      return (this.address.city = place.vicinity)
                    case "route":
                      return (this.address.street1 = number + " " + address.long_name)
                    case "administrative_area_level_1":
                      return (this.address.state = address.short_name)
                  }
                })
              })
            }
            // console.log(this.address)
            this.viewContainerRef.element.nativeElement.dispatchEvent('change')
          })
        })
      })
  }
  sendAddress() {
    this.addressEvent.emit(this.address)
  }


}
