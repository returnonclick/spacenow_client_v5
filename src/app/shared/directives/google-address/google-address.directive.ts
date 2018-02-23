import { Directive, ElementRef, Output, EventEmitter } from '@angular/core'
import { MapsAPILoader } from '@agm/core'
import { } from 'googlemaps'

@Directive({
  selector: '[sn-google-address]'
})
export class GoogleAddressDirective {

  @Output() getAddress = new EventEmitter()

  autocomplete:  any
  addressFields: any = {
    unit_number:                 'short_name',
    street_number:               'short_name',
    route:                       'long_name',
    locality:                    'long_name',
    administrative_area_level_1: 'short_name',
    country:                     'long_name',
    postal_code:                 'short_name'
  }

  constructor(
    private elementRef:    ElementRef,
    private mapsAPILoader: MapsAPILoader,
  ) {
    this.mapsAPILoader.load().then(() => {
      this.autocomplete = new google.maps.places.Autocomplete(this.elementRef.nativeElement)
      this.autocomplete.addListener('place_changed', () => {
        var place = this.autocomplete.getPlace()
        if(!place)
          return

        let address       = new GoogleAddress()
        address.full_name = place.formatted_address
        let location      = place.geometry.location
        address.latitude  = location.lat()
        address.longitude = location.lng()

        for(let addressComp of place.address_components) {
          let addressType = addressComp['types'][0]
          let field       = this.addressFields[addressType]
          if(field)
            address[addressType] = addressComp[field]
        }
        this.getAddress.emit(address)
      })
    })
  }

}

class GoogleAddress {
  full_name:                   string = ''
  unit_number:                 string = ''
  street_number:               string = ''
  route:                       string = ''
  locality:                    string = ''
  administrative_area_level_1: string = ''
  country:                     string = ''
  postal_code:                 string = ''
  latitude:                    number = 0
  longitude:                   number = 0

  constructor(model: any = null) {
    if(model) {
      this.full_name                   = model.full_name
      this.unit_number                 = model.unit_number
      this.street_number               = model.street_number
      this.route                       = model.route
      this.locality                    = model.locality
      this.administrative_area_level_1 = model.administrative_area_level_1
      this.country                     = model.country
      this.postal_code                 = model.postal_code
      this.latitude                    = model.latitude
      this.longitude                   = model.longitude
    }
  }
}
