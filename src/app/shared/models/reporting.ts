/* 
 * MODEL NAME
 * Reporting
 * 
 * IMPORTED MODES
 * Reporting-Types
 * 
 * Path to firebase: `/reportings`
 * 
 *  */

export class Reporting {
  id:         string        = null        
  name:       string        = ''
  type:       string        = ''
  isActive:   Boolean       = false
  days:       Array<string> = new Array()
  period:     string        = ''
  fields: {
      campo,
      description,
      value,
      checked
    }[]

  constructor( model: any = null ) {

    if ( model ) {

      this.id         = model.id     
      this.name       = model.name    
      this.type       = model.type     
      this.isActive   = model.isActive 
      this.days       = model.days     
      this.period     = model.period   
      this.fields     = model.fields   

    }
    
  }

}

export default [ Reporting ]
