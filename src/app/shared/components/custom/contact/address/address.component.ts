import { Component, Input, OnChanges } from '@angular/core'
import { FormArray, FormBuilder, FormGroup } from '@angular/forms'
import { Address } from '@shared/models/address'

@Component({
  selector: 'sn-address',
  templateUrl: './address.component.html',
  styleUrls: [ './address.component.scss' ]
})
export class AddressComponent { 

  @Input('addresses')
  public addressesI: Address[]

  @Input('parentForm')
  public parentForm: FormGroup;

  constructor(
    private _fb: FormBuilder
  ) {
    this.createForm()
  }

  createForm() {
    this.parentForm = this._fb.group({
      addresses: this._fb.array([])
    })
  }

  ngOnChanges() {
    this.setAddresses(this.addressesI)
  }

  get addresses(): FormArray {
    return this.parentForm.get('addresses') as FormArray
  };

  setAddresses(addresses: Address[]) {
    const addressFGs = addresses.map(address => this._fb.group(address))
    const addressFormArray = this._fb.array(addressFGs)
    this.parentForm.setControl('addresses', addressFormArray)
  }

  addAddress() {
    this.addresses.push(this._fb.group(new Address()))
  }

}
