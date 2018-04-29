import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore'
import { Category } from '@shared/models/category';
import { ListingSpecification } from '@shared/models/listing-specification';

import {Observable} from "rxjs/Observable";

@Injectable()
export class CategoryService {

  ref: string = `categories`

  constructor( public afs: AngularFirestore ) {
  }

  public readAll() {
    return this.afs.collection<Category>(this.ref, ref => ref.orderBy('order')).stateChanges()
  }

  public update(id: string, category: Partial<Category>) {
    var data = Object.assign({}, category)
    return this.afs.collection<Category>(this.ref).doc(id).update(data)
  }

  public create(category: Category) {
    var data = Object.assign({}, category)
    const cRef = this.afs.firestore.collection(this.ref).doc()
    data.id = cRef.id
    return this.afs.collection<Category>(this.ref).doc(cRef.id).set(data)
  }

  public delete(id: string) {
    return this.afs.collection<Category>(this.ref).doc(id).delete()
  }

}