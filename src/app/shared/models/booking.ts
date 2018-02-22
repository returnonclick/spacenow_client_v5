export class Booking extends Object{

  constructor(
    public bookingType: string = null,
    public leadTime: number = 0, // in day unit
    public openingTime: number = 0,
    public closingTime: number = 0,
    public closingWeekDays: number[] = [0, 1, 2, 3, 4, 5, 6], // i.e., 0 = Sunday, 1-6 = Mon-Sat. 
    public isOpen247: boolean = false,
    public exceptionDays: Date[] = new Array()
    ){
      super()
  }
}


// export class Booking extends Object{
//
//      bookingType: string
//      leadTime: number
//      openingTime: number
//      closingTime: number
//      isOpen247: boolean
//      exception: string[]
//
//     constructor( model: any = null ) {
//       super(model)
//
//       if(model){
//          this.bookingType = model.bookingType || null
//          this.leadTime = model.leadTime || 0
//          this.openingTime = model.openingTime || 0
//          this.closingTime = model.closingTime || 0
//          this.isOpen247 = model.isOpen247 || false
//          this.exception = model.exception || new Array()
//       }
//   }
// }
//
