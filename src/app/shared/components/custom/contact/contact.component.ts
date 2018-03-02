import { Component, Input } from '@angular/core'
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Contact } from '@shared/models/contact'

@Component({
  selector: 'sn-contact',
  templateUrl: './contact.component.html',
  styleUrls: [ './contact.component.scss' ]
})
export class ContactComponent {

  @Input('contact')
  public contactI: Contact

  @Input('parentForm')
  public parentForm: FormGroup

  constructor(
    private _fb: FormBuilder
  ){}

  ngOnInit() {
    //this.createForm()
    this.setContact(this.contactI)
  }

  createForm() {
    // const contactFG = this._fb.group({
    //   username: ['', Validators.required],
    //   firstName: ['', Validators.required],
    //   lastName: ['', Validators.required],
    //   gender: ['', Validators.required],
    //   dob: ['', Validators.required],
    //   phone: ['', Validators.required]
    // })
    //this.parentForm.addControl('contact', contactFG)
  }

  ngOnChanges() {
    this.setContact(this.contactI)
  }

  get contact(): FormGroup {
    return this.parentForm.get('contact') as FormGroup
  }

  setContact(contact: Contact) {
    const contactFG = this._fb.group({
      username: contact.email,
      firstName: contact.firstName,
      lastName: contact.lastName,
      gender: contact.gender,
      dob: contact.dob,
      phone: contact.phone
    })
    this.parentForm.setControl('contact', contactFG)
  }

}
