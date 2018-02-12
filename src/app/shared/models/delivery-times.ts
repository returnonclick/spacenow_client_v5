/* 
 * MODEL NAME
 * DeliveryTimes
 *  */


export class DeliveryTimes {

  startHour:    string  = ''
  startMinute:  string  = ''
  endHour:      string  = ''
  endMinute:    string  = ''

  constructor( model: any = null ) {

    if( model ) {

      this.startHour      = model.startHour
      this.startMinute    = model.startMinute
      this.endHour        = model.endHour
      this.endMinute      = model.endMinute

    }

  }

}

export default [ DeliveryTimes ]