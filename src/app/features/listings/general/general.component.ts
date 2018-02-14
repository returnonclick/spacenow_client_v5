import { Component, Inject } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'

import * as actions from '@core/store/listings/actions/listing'
import * as fromRoot from '@core/store'

import { ConfirmDeleteComponent, ConfirmSaveComponent } from '@shared/components'
import { Listing } from '@shared/models/listing'

import { DailyComponent } from '@features/listings/price/daily/daily.component'

@Component({
  selector: 'sn-listing-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent {

  isNew: boolean = true
  listing: Listing
  listingForm: FormGroup
  unit: any
  count: number = 0

  units = [
    { value: 'hourly', display: 'Price per hour' },
    { value: 'daily', display: 'Price per day' },
    { value: 'weekly', display: 'Price per week' },
    { value: 'monthly', display: 'Price per month' }
  ]

  constructor(
    // @Inject(MAT_DIALOG_DATA) public data: any,
    // public  dialog: MatDialog,
    // private _dialogRef: MatDialogRef<GeneralComponent>,
    private _fb: FormBuilder,
    private _store: Store<fromRoot.State>
  ) {}

  ngOnInit() {

    // this.listing = this.data.item || new Listing() -> Change lines
    this.listing = new Listing() // remove
    
    // Show Price per day as a default
    // this.listing.price.unit = this.listing.price.unit || this.units[1].value
    // this.listing.price.unit = this.units[1].value

    if(!this.listing.id) // change for this.data.item
      this.isNew = false

    this.listingForm = this._fb.group({
      title:              [this.listing.title, Validators.required],
      description:        [this.listing.description],
      rules:              [this.listing.rules, Validators.required]
    })
  }
 
  onSubmit() {
    this.isNew = true // Change for the validation
    // let dialogRef = this.dialog.open(ConfirmSaveComponent)

    // dialogRef.afterClosed().subscribe(res => {

      // if(res) {
        // if (this.listing.id)
        //   this.isNew = false

        this.listingForm.updateValueAndValidity()
        
        // if(this.listingForm.invalid)
        //   return

        this.listing = this.listingForm.value

        if(this.isNew)
          this._store.dispatch(new actions.Create( this.listing ))
        else
          this._store.dispatch(new actions.Update( this.listing.id, this.listing ))

        // this._dialogRef.close()

      }

    // })

  }

  // onDelete() {

    // let dialogRef = this.dialog.open(ConfirmDeleteComponent)

    // dialogRef.afterClosed().subscribe(res => {

    //   if(res) {
    //     this.listing['isDeleted'] = true
    //     this._store.dispatch(new actions.Delete( this.listing.id ))
    //     this._dialogRef.close()
    //   }

    // })

  // }

// }
