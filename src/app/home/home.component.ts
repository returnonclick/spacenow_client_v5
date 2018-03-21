import { Component }              from '@angular/core'
import { FormBuilder,  
         FormGroup, 
         Validators }             from '@angular/forms'
import { ActivatedRoute, 
         Router }                 from '@angular/router'

import { Store, select }          from '@ngrx/store'
import { Observable }             from 'rxjs/Observable'

import { CardComponent, 
         FeaturedCardComponent }  from '@shared/components/custom/cards'
import { Category }               from '@shared/models/category'

import * as fromRoot              from '@core/store'
import * as actions               from '@core/store/layouts/actions/layout'
import * as categoryActions       from '@core/store/categories/actions/category'
import { switchMap, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'sn-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.scss' ]
})

export class HomeComponent {
  
  form:   FormGroup
  name:   string = ''
  radius: number = 20
  lat:    number = -33.9108137
  lng:    number = 151.1960078

  categories$: Observable<Category[]>

  sliderComponent: any = CardComponent
  sliderFeaturedComponent: any = FeaturedCardComponent

  constructor(
    private _fb:     FormBuilder,
    private _store:  Store<fromRoot.State>,
    private _router: Router,
    private _route:  ActivatedRoute
  ){
    this.categories$ = this._store.pipe(
      select(fromRoot.getAllCategories)
    )
  }

  ngOnInit() {
    this._store.dispatch(new actions.SetLogoWhite())
    this._store.dispatch(new categoryActions.Query())
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

    this._router.navigate(['/search'], {
      queryParams: {
        name:   encodeURIComponent(formVal.name),
        radius: formVal.radius,
        lat:    formVal.lat,
        lng:    formVal.lng
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

  
  // data: Array<any> = [{
  //   isNew: true,
  //   icon: 'add',
  //   button: 'Coworking',
  //   description: 'First test with description'
  // }]
}

