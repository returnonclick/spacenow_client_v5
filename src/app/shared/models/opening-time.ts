import { OpeningDay } from './opening-day'

export class OpeningTime extends Object {
  sun: OpeningDay = new OpeningDay()
  mon: OpeningDay = new OpeningDay()
  tue: OpeningDay = new OpeningDay()
  wed: OpeningDay = new OpeningDay()
  thu: OpeningDay = new OpeningDay()
  fri: OpeningDay = new OpeningDay()
  sat: OpeningDay = new OpeningDay()
  constructor(model: any = null) {
    super(model)

    if(model) {
      this.sun = model.sun || new OpeningDay()
      this.mon = model.sun || new OpeningDay()
      this.tue = model.sun || new OpeningDay()
      this.wed = model.sun || new OpeningDay()
      this.thu = model.sun || new OpeningDay()
      this.fri = model.sun || new OpeningDay()
      this.sat = model.sun || new OpeningDay()
    }
  }
}
