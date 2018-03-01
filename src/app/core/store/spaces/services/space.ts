import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore'
import { Observable } from 'rxjs/Observable'

import { Space } from '@models/space'

@Injectable()
export class SpaceService {

  private ref: string = `listings-errol`

  constructor(private afs: AngularFirestore) { }

  readOne(id: string): Observable<Space> {
    return this.afs.doc<Space>(`${this.ref}/${id}`).valueChanges()
  }

}
