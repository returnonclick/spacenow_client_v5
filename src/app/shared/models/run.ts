/* 
 * MODEL NAME
 * DeliveryRun
 * 
 * IMPORTED MODES
 * Delivery Times
 * 
 * Path to firebase: `/runs`
 * 
 *  */

 import { DeliveryTimes } from './delivery-times'

export class Run {

  id:               string          = ''
  name:             string          = ''
  state:            string          = ''
  postcodes:        Array<string>   = new Array()
  suburbs:          Array<string>   = new Array()
  customers:        Array<string>   = new Array()
  deliveryDays:     Array<string>   = new Array()
  driverId:         string          = ''
  deliveryTimes:    DeliveryTimes   = new DeliveryTimes()
  isActive:         boolean         = false

  constructor( model: any = null ) {

    if(model) {

      this.id               = model.id
      this.name             = model.name            
      this.state            = model.state           
      this.postcodes        = model.postcodes      
      this.suburbs          = model.suburbs       
      this.customers        = model.customers     
      this.deliveryDays     = model.deliveryDays    
      this.driverId         = model.driverId        
      this.deliveryTimes    = model.deliveryTimes   
      this.isActive         = model.isActive        

    }

  }

}

export class deliveryTimes {
  startHour:    string
  startMinute:  string
  endHour:      string
  endMinute:    string
}

export enum DeliveryDays {
  Sunday = 0,
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6

}

export default [ Run ]