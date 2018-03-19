import { Component } from '@angular/core'
import { FormBuilder,  FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'

import { Store, select }          from '@ngrx/store'

import { CardComponent, FeaturedCardComponent } from '@shared/components/custom/cards'

import * as fromRoot              from '@core/store'
import * as actions         from '@core/store/layouts/actions/layout'

@Component({
  selector: 'sn-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.scss' ]
})
export class HomeComponent {

  form:      FormGroup
  name:   string = ''
  radius: number = 20
  lat:    number = -33.9108137
  lng:    number = 151.1960078

  constructor(
    private _fb:     FormBuilder,
    private _store: Store<fromRoot.State>,
    private _router: Router
  ){}

  ngOnInit() {
    this._store.dispatch(new actions.SetLogoWhite())
    this.createForm()
  }

  selectedAddress(address) {
    this.form.get('lat').setValue(address.latitude)
    this.form.get('lng').setValue(address.longitude)
    this.form.get('name').setValue(address.full_name)
  }

  onSubmit() {
    this.form.updateValueAndValidity()
    if(this.form.invalid)
      return

    let formVal = this.form.value

    this._router.navigate(['/app/search'], {
      queryParams: {
        name:   encodeURIComponent(formVal.name),
        radius: formVal.radius,
        lat:    formVal.lat,
        lng:    formVal.lng,
      }
    })
  }

  private createForm() {
    this.form = this._fb.group({
      name:   [ this.name, Validators.required ],
      radius: [ this.radius, Validators.required ],
      lat:    [ this.lat ],
      lng:    [ this.lng ],
    })
  }

  sliderComponent: any = CardComponent
  sliderFeaturedComponent: any = FeaturedCardComponent
  data: Array<any> = [{
    isNew: true
  }, {
    isNew: !true
  }, {
    isNew: true
  }, {
    isNew: true
  }, {
    isNew: !true
  }, {
    isNew: true
  }, {
    isNew: !true
  }, {
    isNew: true
  }]
}

