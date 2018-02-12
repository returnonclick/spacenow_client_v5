/* 
 * MODEL NAME
 * States
 * 
 * Path to firebase: `/states`
 * 
 *  */

export class StateAddress {

  id:           string    = null
  state:        string    = ''
  status:       boolean   = false
  description:  string    = ''

  constructor( model: any = null) {

    if ( model ) {

      this.id           = model.id
      this.state        = model.state
      this.status       = model.status
      this.description  = model.description

    }

  }

}

export default [ StateAddress ]