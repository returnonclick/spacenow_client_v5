import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore'
import { Page } from '@shared/models/page';

import {Observable} from "rxjs/Observable";

@Injectable()
export class PageService {

  ref: string = `pages`

  constructor( public afs: AngularFirestore ) {
  }

  public readAll() {
    console.log('service')
    return this.afs.collection<Page>(this.ref).stateChanges()
  }

  // public readByTag(tag: string) {
  //   return this.afs.collection<Page>(this.ref, ref => ref.where('tag', '==', tag)).stateChanges()
  // }

  public update(id: string, page: Partial<Page>) {
    var data = Object.assign({}, page)
    return this.afs.collection<Page>(this.ref).doc(id).update(data)
  }

  public create(page: Page) {
    var data = Object.assign({}, page)
    const cRef = this.afs.firestore.collection(this.ref).doc()
    data.id = cRef.id
    return this.afs.collection<Page>(this.ref).doc(cRef.id).set(data)
  }

  public delete(id: string) {
    return this.afs.collection<Page>(this.ref).doc(id).delete()
  }

}