/* 
 * MODEL NAME
 * Role
 * 
 * RELATED MODEL
 * User
 * 
 * Path to firebase: `/roles/{$roleID}`
 * 
 *  */

 import { User } from './user'


export class Role {

  id:           string      = null
  name:         string      = ''
  slug:         string      = ''
  description:  string      = ''
  users:        Array<User> = null

  constructor( model: any = null ) {
    
    if ( model ) {

      this.id          = model.id
      this.name        = model.name
      this.slug        = model.slug
      this.description = model.description
      this.users       = model.users

    }

  }

}

export default [ Role ]
