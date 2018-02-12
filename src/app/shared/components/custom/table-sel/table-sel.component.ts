import { Component, Input } from '@angular/core'
import { DataSource } from '@angular/cdk/collections'
import { BehaviorSubject, Observable, Subject } from 'rxjs'

/**
 * COMPONENT USE DESCRIPTION
 * Multi-selector displayed into two separate tables
 * ACTIONS: Select, Select All, Unselect and Unselect All
 * Inputs:
 * items:        Observable of all available items                               *required
 * idAttr:       String to determine the unique identifier of every item object
 * nameAttr:     String to determine the attribute to access to display the text; or
 *               Function to resolve how to access the attribute from the object item
 * height:       Height of the Custom Component
 * orderBy:      String determine the attribute on where to sort
 *               (assumes attribute value is a string)
 * initSelected: List of IDs (defined by the values in idAttr) to be initially
 *               selected upon loading the component
 */
@Component({
  selector: 'gen-table-sel',
  templateUrl: './table-sel.component.html',
  styleUrls: [ './table-sel.component.scss' ]
})
export class TableSelectorComponent {

  @Input() items: Observable<any>
  @Input() idAttr: string         = "id"
  @Input() nameAttr: any          = "name"
  @Input() height: string         = '400px'
  @Input() orderBy: string        = "id"
  @Input() initSelected: any[]    = []

  selected$: BehaviorSubject<any> = new BehaviorSubject([])

  ngOnInit() {
    this.items.subscribe(res => {
      if(res) {
        this.selected$.next(
          res.map(item =>
            (this.initSelected.indexOf(item[this.idAttr]) !== -1)
              ? { selected: false, item: item }
              : null
          ).filter(x => x)
        )
      } else
        null
    })
  }

  printVal(item) {
    return (typeof this.nameAttr !== 'string') ? this.nameAttr(item) : item[this.nameAttr]
  }

  moveTicked(from$: BehaviorSubject<any>, to$: BehaviorSubject<any>) {
    let from = from$.value
    let to = to$.value

    let ticked = from.map(item =>
      item.selected ? item : null
    ).filter(x => x)
    let unticked = from.map(item =>
      !item.selected ? item : null
    ).filter(x => x)

    let merged = [...to, ...ticked].sort((a, b) => {
      let valA = a.item[this.orderBy]
      let valB = b.item[this.orderBy]

      if(!(valA && valB))
        return 0

      return (valA < valB) ? -1 : ((valA > valB) ? 1 : 0)
    }).map(item => {
      item.selected = false
      return item
    })
    from$.next(unticked)
    to$.next(merged)
  }

  moveAll(from$: BehaviorSubject<any>, to$: BehaviorSubject<any>) {
    let from = from$.value
    let to = to$.value

    let merged = [...from, ...to].sort((a, b) => {
      let valA = a.item[this.orderBy]
      let valB = b.item[this.orderBy]

      if(!(valA && valB))
        return 0

      return (valA < valB) ? -1 : ((valA > valB) ? 1 : 0)
    }).map(item => {
      item.selected = false
      return item
    })
    from$.next([])
    to$.next(merged)
  }

  get selected() {
    return this.selected$
  }

}
