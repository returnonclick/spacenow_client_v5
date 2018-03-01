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
  public contact: Contact;

  @Input('parentForm')
  public parentForm: FormGroup;

  constructor(
    private _fb: FormBuilder
  ){}

  ngOnInit() {
    this.createForm()
  }

  createForm() {
    this.parentForm = this._fb.group({
      username: [this.contact.email, Validators.required],
      firstName: [this.contact.firstName, Validators.required],
      lastName: [this.contact.lastName, Validators.required],
      gender: [this.contact.gender, Validators.required],
      dob: [this.contact.dob, Validators.required],
      phoneNumber: [this.contact.phone, Validators.required]
    });
  }

  ngOnChanges() {
    this.parentForm.reset({
      username: [this.contact.email, Validators.required],
      firstName: [this.contact.firstName, Validators.required],
      lastName: [this.contact.lastName, Validators.required],
      gender: [this.contact.gender, Validators.required],
      dob: [this.contact.dob, Validators.required],
      phoneNumber: [this.contact.phone, Validators.required]
    });
  }

}
