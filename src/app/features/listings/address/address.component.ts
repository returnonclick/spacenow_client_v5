import { Component, Input, OnInit, ViewChild, ComponentFactoryResolver, Type, ElementRef } from '@angular/core'
import { SNAddressDirective } from './address.directive';
import { ListingAddressComponent } from './listing-address/listing-address.component'


@Component({
  selector: 'sn-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})

export class AddressComponent {

    constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

}