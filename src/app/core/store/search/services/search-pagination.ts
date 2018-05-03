import { Injectable } from '@angular/core'
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore'
import { Observable } from 'rxjs'
import { of } from 'rxjs/observable/of'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/scan'
import 'rxjs/add/operator/take'

import * as firebase from 'firebase/app'

import { ListingShortDetail } from '@shared/models/listing-short-detail'

@Injectable()
export class SearchService {

  ref: string = `listings` // change for listing-short-details in store as well

  private _data = new BehaviorSubject([]);
  private _loading = new BehaviorSubject(false);
  private _done = new BehaviorSubject(false);
  reverse: boolean = false

  data: Observable<any>;
  done: Observable<boolean> = this._done.asObservable();
  loading: Observable<boolean> = this._loading.asObservable();
  
  constructor(private _afs: AngularFirestore) { }

  public query(params: any = null) {
    const aux = this._afs.collection(this.ref, ref => {
      let data
      data = ref.where('status', '==', 'active')
      if( params.categoryId ) { data = data.where('categoryId', '==', params.categoryId) }
      if( params.minPrice ) { data = data.where('price.price', '>=', +params.minPrice) }
      if( params.maxPrice ) { data = data.where('price.price', '<=', +params.maxPrice) }
      if( params.country ) { data = data.where('address.country', '==', params.country) }
      if( params.locality ) { data = data.where('address.locality', '==', params.locality) }
      if( params.street ) { data = data.where('address.route', '==', params.street) }
      data = data.limit(4)
      return data
    })

    this.mapAndUpdate(aux, params)

    this.data = this._data.asObservable()
    .scan( (acc, val) => { 
      // console.log(val)
      return val
    })
   
  }

  public next(params) {
    const cursor = this.getCursor(false)
    this.reverse = false

    const next = this._afs.collection(this.ref, ref => {
      let data
      data = ref.where('status', '==', 'active')
      if( params.categoryId ) { data = data.where('categoryId', '==', params.categoryId) }
      if( params.minPrice ) { data = data.where('price.price', '>=', +params.minPrice) }
      if( params.maxPrice ) { data = data.where('price.price', '<=', +params.maxPrice) }
      if( params.country ) { data = data.where('address.country', '==', params.country) }
      if( params.locality ) { data = data.where('address.locality', '==', params.locality) }
      if( params.street ) { data = data.where('address.route', '==', params.street) }
      data = data.startAfter(cursor).limit(4)
      return data
    })

    this.mapAndUpdate(next, params)
  }

  public back(params) {
    const cursor = this.getCursor(true)
    this.reverse = true

    const next = this._afs.collection(this.ref, ref => {
      let data
      data = ref.where('status', '==', 'active')
      if( params.categoryId ) { data = data.where('categoryId', '==', params.categoryId) }
      if( params.minPrice ) { data = data.where('price.price', '>=', +params.minPrice) }
      if( params.maxPrice ) { data = data.where('price.price', '<=', +params.maxPrice) }
      if( params.country ) { data = data.where('address.country', '==', params.country) }
      if( params.locality ) { data = data.where('address.locality', '==', params.locality) }
      if( params.street ) { data = data.where('address.route', '==', params.street) }

      data = data.endBefore(cursor) // cursor
      return data
    })

    this.mapAndUpdate(next, params)
  }

  private getCursor(first) {
    const current = this._data.value
    // console.log(first ? current[0] : current[current.length - 1])
    if (current.length) {
      return first ? current[0].doc : current[current.length - 1].doc
    }
    return null
  }

  private mapAndUpdate(col: AngularFirestoreCollection<any>, params) {
    
      if (this._loading.value) { return };
  
      // loading
      this._loading.next(true)
  
      // Map snapshot with doc ref (needed for cursor)
      return col.snapshotChanges()
        .do(arr => {
          let values = arr.map(snap => {
            const data = snap.payload.doc.data()
            const doc = snap.payload.doc
            return { ...data, doc }
          })
    
          // If prepending, reverse the batch order
          values = this.reverse ? values.reverse().slice(0, 4).reverse() : values
  
          // update source with new values, done loading
          this._data.next(values)
          this._loading.next(false)
  
          // no more values, mark done
          if (values.length < 4) // It's gonna have a bug when length/4 = 0
            this._done.next(true)
          else
            this._done.next(false)
      })
      .take(1)
      .subscribe()

    }
}
