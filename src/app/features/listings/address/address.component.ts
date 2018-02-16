import { Component, Inject, Input, AnimationKeyframe } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog'
import { Store } from '@ngrx/store'

import { GoogleAddressDirective } from '@shared/directives/google-address.directive';
import address, { Address } from '@shared/models/address';
import { Database } from '@firebase/database';

@Component({
  selector: 'sn-address-general',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent {

  addressForm: FormGroup
  address: Address
  vSearch: string
  add: any

  constructor(
    private _fb: FormBuilder
  ) {

  }

  ngOnInit() {
    this.address = new Address

    this.addressForm = this._fb.group({
      countryName:              [this.address.countryName, Validators.required],
      countryCode:              [this.address.countryCode, Validators.required],
      street1:                  [this.address.street1, Validators.required],
      street2:                  [this.address.street2],
      city:                     [this.address.city, Validators.required],
      state:                    [this.address.state, Validators.required],
      postalCode:               [this.address.postalCode, Validators.required],

    })
  }

   // Get address form
   getAddress(address) {
    this.add = address
    console.log(this.add)
  }
}
