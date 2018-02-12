/* 
 * MODEL NAME
 * Suburb
 * 
 * IMPORTED MODES
 *
 * 
 * Path to firebase: `/suburbs`
 * 
 *  */

export class Suburb {
  id:           string    = null
  postcodeID:   string    = ''
  postcode:     string    = ''
  suburb:       string    = ''
  status:       boolean   = false
  description:  string    = ''

  constructor( model: any = null ) {

    if ( model ) {

      this.id           = model.id
      this.postcodeID   = model.postcodeID
      this.postcode     = model.postcode
      this.suburb       = model.suburb
      this.status       = model.status
      this.description  = model.description

    }

  }

}

export default [ Suburb ]