import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'

import * as moment from 'moment'

import { Space } from '@models/space'
import { User } from '@models/user'

import * as fromRoot from '@core/store'
import * as spaceActions from '@core/store/spaces/actions/space'
import * as layoutActions from '@core/store/layouts/actions/layout'

@Component({
  selector: 'sn-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: [ './calendar.component.scss' ]
})
export class CalendarComponent {

  calendar$: Observable<MonthSpace[]>
  test$: Observable<any>

  constructor(
    private _store: Store<fromRoot.State>
  ) {
    this.calendar$ = this._store.select(fromRoot.getAllSpaces).map(spaces => {
      let calendar = spaces.reduce((acc, curr: Space) => {
        let d = curr.createdAt || curr['created']
        let dateMoment = moment()
        if(typeof d === 'string') {
          let transform = d.replace(/ (at|UTC)/g, '') + ' +00:00'
          dateMoment = moment(transform, 'MMM DD, YYYY hh:mm:ss A Z')
        }
        else
          dateMoment = moment(d)

        let month = dateMoment.format('MMMM YYYY')
        try {
          acc[month].push(curr)
        }
        catch(e) {
          acc[month] = [ curr ]
        }

        return acc
      }, {})
      let calendarList: MonthSpace[] = Object.keys(calendar).map(key => {
        return {
          month: key,
          spaces: calendar[key]
        }
      }).sort((a, b) => {
        let monthA = +moment(a.month, 'MMMM YYYY').format('M')
        let monthB = +moment(b.month, 'MMMM YYYY').format('M')
        return monthA > monthB ? 1 : -1
      })

      return calendarList
    })
  }

  ngOnInit() {
    this._store.dispatch(new spaceActions.All) // TODO: change to appropriate action
    this._store.dispatch(new layoutActions.SetLogoGreen)
  }

}

interface MonthSpace {
  month: string
  spaces: Space[]
}
