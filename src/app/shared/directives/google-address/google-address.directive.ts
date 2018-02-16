import { Directive, ViewContainerRef, Input, ElementRef, NgZone, ViewChild, Output, EventEmitter } from '@angular/core'
import { FormControl } from '@angular/forms'
import { } from 'googlemaps'
import { MapsAPILoader } from '@agm/core'
import address from '@shared/models/address';


@Directive({
  selector: '[sn-google-address]'
})

export class GoogleAddressDirective {

  address: GoogleAddress

  @Output()
  getAddress = new EventEmitter()
  
  autocomplete: any
  componentForm: any = {
        unit_number: 'short_name',
        street_number: 'short_name',
        route: 'long_name',
        locality: 'long_name',
        administrative_area_level_1: 'short_name',
        country: 'long_name',
        postal_code: 'short_name'
      };

  constructor(
    private el: ElementRef,
    private mapsAPILoader: MapsAPILoader,
    private ngZone       : NgZone,
  ) {

      this.mapsAPILoader.load().then(() => {
        this.autocomplete = new google.maps.places.Autocomplete(this.el.nativeElement, {})
        this.autocomplete.addListener('place_changed', () => {
          this.address = new GoogleAddress()
          var place = this.autocomplete.getPlace();
          if (!place) {
            return;
          } else {
            console.log(place)
            for (var i = 0; i < place.address_components.length; i++) {
              var addressType = place.address_components[i].types[0];
              if (this.componentForm[addressType]) {
                this.address[addressType] = place.address_components[i][this.componentForm[addressType]]
              }
            }
            
           this.getAddress.emit(this.address)
      
          }
        });
      })

  }

}

class GoogleAddress {

  unit_number:                string = ''
  street_number:                string = ''
  route:                        string = ''
  locality:                     string = ''
  administrative_area_level_1:  string = ''
  country:                      string = ''
  postal_code:                  string = ''

  constructor ( model: any = null) {

    if ( model ) {

      this.unit_number                  = model.unit_number
      this.street_number                = model.street_number             
      this.route                        = model.route                     
      this.locality                     = model.locality                  
      this.administrative_area_level_1  = model.administrative_area_level_1
      this.country                      = model.country                   
      this.postal_code                  = model.postal_code               

    }

  }

}