import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore'
import { Profile } from '@shared/models/profile';

@Injectable()
export class UserProfileService {

  ref: string = `users-profile`

  constructor( public afs: AngularFirestore ) {
  }

  public read(uid) {
    return this.afs.collection<Profile>(this.ref, ref => ref.where(`uid`, '==', `${uid}`)).stateChanges()
  }

  public update(id: string, profile: Partial<Profile>) {
    var data = Object.assign({}, profile)
    return this.afs.collection<Profile>(this.ref).doc(id).update(data)
  }

  public create(profile: Profile) {
    var data = Object.assign({}, profile)
    const cRef = this.afs.firestore.collection(this.ref).doc()
    data.uid = cRef.id
    return this.afs.collection<Profile>(this.ref).doc(cRef.id).set(data)
  }

  public delete(id: string) {
    return this.afs.collection<Profile>(this.ref).doc(id).delete()
  }

}
