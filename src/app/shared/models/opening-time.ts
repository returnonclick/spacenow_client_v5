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
    super()

    if(model) {
      this.sun = model.sun || new OpeningDay()
      this.mon = model.mon || new OpeningDay()
      this.tue = model.tue || new OpeningDay()
      this.wed = model.wed || new OpeningDay()
      this.thu = model.thu || new OpeningDay()
      this.fri = model.fri || new OpeningDay()
      this.sat = model.sat || new OpeningDay()
    }
  }
}
