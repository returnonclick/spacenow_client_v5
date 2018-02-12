import { Component, Inject } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'

import { ConfirmDeleteComponent } from '@shared/components'
import { User } from '@shared/models/user'

import * as actions from '@core/store/users/actions/user'
import * as fromRoot from '@core/store'

@Component({
  selector: 'gen-user',
  templateUrl: './user.component.html',
  styleUrls: [ './user.component.scss' ]
})
export class UserComponent {

  users$: Observable<User[]>

  isNew: boolean = false
  //form: FormGroup
  user: User

  // constructor(
  //   @Inject(MAT_DIALOG_DATA) public data: any,
  //   private _store: Store<fromRoot.State>,
  //   private _fb: FormBuilder,
  //   private _dialog: MatDialog,
  //   private _dialogRef: MatDialogRef<ModifyProgramComponent>
  // ) {
  //   this.programTypes = Object.keys(ProgramType).map(key => {
  //     return {
  //       key: key,
  //       value: ProgramType[key]
  //     }
  //   })

  //   this._creativeStore.select(fromCreative.getCurrentUser).subscribe(user => {
  //     if(user)
  //       this._currentUser = user
  //   })
  // }

  // ngOnInit() {
  //   this.mealPlans$ = this.data.mealPlans

  //   this.user = this.data.item
  //   if(!this.data.item) {
  //     this.user = new Program()
  //     this.isNew = true
  //   }

  //   this.minDate = this.user.startDate || null
  //   this.form = this._fb.group({
  //     name: [this.user.name || '', Validators.required],
  //     type: [this.user.type || null, Validators.required],
  //     mealPlanId: [this.user.mealPlanId || null, Validators.required],
  //     hasStart: [!!this.user.startDate],
  //     startDate: [{
  //       value: this.minDate || '',
  //       disabled: !this.user.startDate
  //     }],
  //     hasEnd: [!!this.user.endDate],
  //     endDate: [{
  //       value: this.user.endDate || '',
  //       disabled: !this.user.endDate
  //     }],
  //     isActive: [this.isNew || this.user.isActive]
  //   })

  //   this.form.get('hasStart').valueChanges.subscribe(res => {
  //     let startDateFld = this.form.get('startDate')
  //     if(res)
  //       startDateFld.enable()
  //     else
  //       startDateFld.disable()
  //     startDateFld.setValidators(res ? [ Validators.required ] : null)
  //     startDateFld.updateValueAndValidity()
  //   })

  //   this.form.get('hasEnd').valueChanges.subscribe(res => {
  //     let endDateFld = this.form.get('endDate')
  //     if(res)
  //       endDateFld.enable()
  //     else
  //       endDateFld.disable()
  //     endDateFld.setValidators(res ? [ Validators.required ] : null)
  //     endDateFld.updateValueAndValidity()
  //   })

  //   this.form.get('startDate').valueChanges.subscribe(res => {
  //     if(res)
  //       this.minDate = new Date(res)
  //   })
  // }

  // onSubmit() {
  //   this.form.updateValueAndValidity()
  //   if(this.form.invalid)
  //     return

  //   let formVal = this.form.value
  //   this.user.name       = formVal.name
  //   this.user.type       = formVal.type
  //   this.user.mealPlanId = formVal.mealPlanId
  //   this.user.isActive   = formVal.isActive
  //   this.user.startDate  = formVal.startDate || null
  //   this.user.endDate    = formVal.endDate || null

  //   if(this.isNew) {
  //     this.user.createdBy = this._currentUser.userId
  //     this.user.createdOn = new Date()
  //     this._effStore.dispatch(new programActions.AddProgramAction({ user: this.user }))
  //   }
  //   else {
  //     this.user.updatedBy = this._currentUser.userId
  //     this.user.updatedOn = new Date()
  //     this._effStore.dispatch(new programActions.EditProgramAction({ user: this.user }))
  //   }

  //   this._dialogRef.close()
  // }

  // onDelete() {
  //   this._dialog.open(ConfirmDeleteComponent).afterClosed().subscribe(res => {
  //     if(res) {
  //       this._effStore.dispatch(new programActions.DeleteProgramAction({ user: this.user }))
  //       this._dialogRef.close()
  //     }
  //   })
  // }

}
