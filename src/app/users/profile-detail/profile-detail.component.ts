import { Component, OnInit, OnChanges, Input, AfterViewInit, ChangeDetectorRef } from '@angular/core'
import { AbstractControl, FormBuilder, FormGroup, Validators, FormArray, FormControl, ValidatorFn } from '@angular/forms'
import { Router, ActivatedRoute, Params } from '@angular/router'

import { Store, select } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'
import { map, combineLatest } from 'rxjs/operators'
import { User } from '@shared/models/user'
import { Profile } from '@shared/models/profile'
import { Contact } from '@shared/models/contact'
import { Card } from '@shared/models/card'

import * as actions from '@core/store/auth/actions/auth'
import * as profileActions from '@core/store/users-profile/actions/user-profile'
import * as fromRoot from '@core/store'

@Component({
  selector: 'sn-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.scss']
})
export class ProfileDetailComponent {

  @Input('profile')
  public profile: Profile

  public profileForm: FormGroup

  constructor(
    private _fb: FormBuilder,
    private _store: Store<fromRoot.State>,
    private cdRef: ChangeDetectorRef
  ) {
    this.createForm()
  }

  createForm() {
    this.profileForm = this._fb.group({
      //cards: this._fb.array([])
    })
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  ngOnChanges(){
    //this.setCards(this.profile.cards)
  }

  // get cards(): FormArray {
  //   return this.profileForm.get('cards') as FormArray
  // }

  // setCards(cards: Card[]) {
  //   const cardFGs = cards.map(card => this._fb.group(card))
  //   const acardFA = this._fb.array(cardFGs)
  //   this.profileForm.setControl('cards', acardFA)
  // }

  // addCard() {
  //   this.cards.push(this._fb.group(new Card()))
  // }

  onSubmit() {
    this.profileForm.updateValueAndValidity()
    if(this.profileForm.invalid)
      return
    let frmProfile = Object.assign({}, this.profileForm.value);
    this.profile = Object.assign(this.profile, this.profileForm.value)
    this._store.dispatch(new profileActions.Update( this.profile.uid, this.profile ))
  }

}