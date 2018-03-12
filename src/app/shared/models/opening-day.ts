export class OpeningDay extends Object {
  
  startHour:   number  = 0
  closeHour:   number  = 0
  startMinute: number  = 0 // not gonna be used yet
  closeMinute: number  = 0 // not gonna be used yet
  isOpen:      boolean = true

  constructor(model: any = null) {
    super(model)
    if(model) {
      this.startHour   = model.startHour || 0
      this.closeHour   = model.closeHour || 0
      this.startMinute = model.startMinute || 0
      this.closeMinute = model.closeMinute || 0
      this.isOpen      = model.isOpen || true
    }
  }

}