import { Component } from '@angular/core'
import { FormBuilder,  FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'

import { Space } from '@shared/models/space'

import * as fromRoot from '@core/store'
import * as searchActions from '@core/store/search/actions/search'

@Component({
  selector: 'sn-search',
  templateUrl: './search.component.html',
  styleUrls: [ './search.component.scss' ]
})
export class SearchComponent {

  zoom:   number = 16
  name:   string = ''
  radius: number = 20
  lat:    number = -33.9108137
  lng:    number = 151.

  results$:   Observable<Space[]>
  isLoading$: Observable<boolean>

  form: FormGroup

  constructor(
    private _fb:     FormBuilder,
    private _route:  ActivatedRoute,
    private _router: Router,
    private _store:  Store<fromRoot.State>,
  ) {
    this.results$   = this._store.select(fromRoot.getAllSearches)
    this.isLoading$ = this._store.select(fromRoot.isLoadingSearch)
  }

  ngOnInit() {
    this._route.queryParams.subscribe(query => {
      this.name   = decodeURIComponent(query.name) || this.name
      this.radius = +query.radius || this.radius
      this.lat    = +query.lat || this.lat
      this.lng    = +query.lng || this.lng
      this._store.dispatch(new searchActions.Query(query))
    })

    this.form = this._fb.group({
      name:   [ this.name, Validators.required ],
      radius: [ this.radius, Validators.required ],
      lat:    [ this.lat ],
      lng:    [ this.lng ],
    })
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

    this._router.navigate(['search'], {
      queryParams: {
        name:   encodeURIComponent(formVal.name),
        radius: formVal.radius,
        lat:    formVal.lat,
        lng:    formVal.lng,
      }
    })
  }

}
