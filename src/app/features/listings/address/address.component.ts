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

  constructor(
    private _fb: FormBuilder
  ) {
    this.vSearch = 'test'
  }

  ngOnInit() {
    this.address = new Address

    this.addressForm = this._fb.group({
      countryName:              [this.address.countryName, Validators.required],
      countryCode:              [this.address.countryCode, Validators.required],
      countryStreet1:           [this.address.street1, Validators.required],
      countryStreet2:           [this.address.street2],
      city:                     [this.address.city, Validators.required],
      state:                    [this.address.state, Validators.required],
      postalCode:               [this.address.postalCode, Validators.required],

    })
  }

  onSubmit() {
  }
}
