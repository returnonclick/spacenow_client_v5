/* 
 * MODEL NAME
 * Postcode
 * 
 * Path to firebase: `/postcodes`
 * 
 *  */

export class Postcode {
  id:           string    = null
  stateID:      string    = ''
  state:        string    = ''
  postcode:     string    = ''
  status:       boolean   = false
  description:  string    = ''


  constructor( model: any = null) {

    if (model) {

      this.id           = model.id
      this.stateID      = model.stateID
      this.state        = model.state
      this.postcode     = model.postcode
      this.status       = model.status
      this.description  = model.description

    }

  }

}

export default [ Postcode ]