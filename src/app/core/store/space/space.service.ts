import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore'

import { Observable } from 'rxjs/Observable'

import { Space } from '@models/space'

@Injectable()
export class SpaceService {

  private spaceRef: string = `listings`

  constructor(private afs: AngularFirestore) { }

  getSpaces(): Observable<Space[]> {
    return Observable.create(observer =>{
      this.afs.collection<any>(this.spaceRef).valueChanges().subscribe(spaces =>{
        observer.next(spaces)
        observer.complete()
      })
    }) 
  }

  getSpace(spaceID): Observable<Space> {
    return Observable.create(observer =>{
      this.afs.doc<any>(this.spaceRef + '/' + spaceID).valueChanges().subscribe(space =>{
        observer.next(space)
        observer.complete()
        })
      })
    }
      
}
