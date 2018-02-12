import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore'
import { User } from '@shared/models/User';

@Injectable()
export class UserService {

  ref: string = `users`

  constructor( public afs: AngularFirestore ) {
  }

  public readAll() {
    return this.afs.collection<User>(this.ref).stateChanges()
  }

  public readRoleByUser(role: string) {
    return this.afs.collection<User>(this.ref, ref => ref.where(`roles`, '==', `${role}`)).stateChanges()
  }

  public update(id: string, user: Partial<User>) {
    var data = Object.assign({}, user)
    return this.afs.collection<User>(this.ref).doc(id).update(data)
  }

  public create(user: User) {
    var data = Object.assign({}, user)
    const cRef = this.afs.firestore.collection(this.ref).doc()
    data.userUID = cRef.id
    return this.afs.collection<User>(this.ref).doc(cRef.id).set(data)
  }

  public delete(id: string) {
    return this.afs.collection<User>(this.ref).doc(id).delete()
  }

}