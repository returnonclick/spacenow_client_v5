import { Component, ChangeDetectionStrategy, ViewChild, Input } from '@angular/core'
import { DataSource } from '@angular/cdk/collections'
import { MatDialog, MatSnackBar, MatSnackBarConfig, MatPaginator, MatSort } from "@angular/material"
import { Router } from '@angular/router'
import { Observable, BehaviorSubject } from 'rxjs'
import { startWith } from 'rxjs/operators'

import { FilterComponent } from '../filter/filter.component'

/**
 *  COMPONENT USE DESCRIPTION
 *  TABLE FOR A DEFINED MODEL WITH PAGINATION, FILTER BY FIELD AND SORT FUNCTIONS.
 *  ACTIONS: ADD, EDIT AND DELETE FUNCTIONS.
 *  Inputs:
 *  items:           Observable of items array (not use asyn filter for sending it)                   *required
 *  addComponent:    You can send a Component itself to pop-up a modal, or send a route string to     *required
 *                   the app navigate to that route
 *  editComponent:   Send the component itself (If same as addComponent, send it again)               *required
 *  objIdentifier:   Specifies with object property to send in the edit component                     *required if editComponent is a route string
 *                   Can be a string to access in the object, or a function to how to resolve it
 *  deleteComponent: Send the component itself (This component must contain the delete function)      *required
 *  itemsCols:       Array of objects describing the column fields for the table. Structural example: *required
 *                    itemsCols = [{'columnName': 'nameOne', 'displayName': 'Name One'},
 *                                {'columnName': 'nameTwo', 'displayName': 'Name Two'}]
 *  valMap:          Function that returns the value to be printed directly into the cell             *required
 *  extraData:       Object that will be passed to the add/edit/delete components as well
 *  width:           Width of the pop-up dialog
 */
@Component({
  selector: 'gen-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent {

  @Input() items:           Observable<any>
  @Input() addComponent:    any
  @Input() deleteComponent: any
  @Input() editComponent:   any
  @Input() objIdentifier:   any
  @Input() itemsCols:       any
  @Input() valMap:          any
  @Input() extraData:       any             = {}
  @Input() width:           string          = "auto"

  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort:           MatSort

  displayedColumns: any                     = []
  dataSource:       ItemsDataSource | null
  hasFilter:        boolean                 = false
  filter:           BehaviorSubject<string> = new BehaviorSubject(null)

  constructor(
    public _itemDialog: MatDialog,
    public router: Router,
  ) { }

  ngOnInit() {
    this.itemsCols.forEach(column => {
      this.displayedColumns.push(column.name)
    })

    this.dataSource = new ItemsDataSource(this.items, this.paginator, this.sort, this.filter, this.valMap, this.itemsCols)

    this.paginator.pageIndex = 0
    this.paginator.pageSize = 25
    this.paginator.pageSizeOptions = [5, 10, 25, 100]
  }

  editItemDialog(_item: any) {
    if(typeof this.editComponent === 'string') {
      this.router.navigate([`${this.editComponent}/${this.resolveObject(_item)}`])
    }
    else {
      let dialogRef = this._itemDialog.open(this.editComponent, {
        width: this.width,
        data: {
          item: _item,
          ...this.extraData
        }
      })
    }
  }

  deleteItemDialog(_item: any) {
    let dialogRef = this._itemDialog.open(this.deleteComponent, {
      width: this.width,
      data: _item
    })
  }

  addItemDialog() {
    if(typeof this.addComponent === 'string') {
      this.router.navigate([this.addComponent])
    }
    else {
      let dialogRef = this._itemDialog.open(this.addComponent, {
        width: this.width,
        data: {
          ...this.extraData
        }
      })
    }
  }

  openFilterDialog() {
    let dialogRef = this._itemDialog.open(FilterComponent, {
      data: {
        value: this.filter.value
      }
    })
    dialogRef.afterClosed().subscribe(val => {
      if(val) {
        this.hasFilter = true
        this.filter.next(val)
      }
      else {
        this.hasFilter = false
        this.filter.next(null)
      }
    })
  }

  resolveObject(item) {
    return (typeof this.objIdentifier !== 'string') ? this.objIdentifier(item) : item[this.objIdentifier]
  }

}

class ItemsDataSource extends DataSource<any> {

  constructor(
    private _database: Observable<any>,
    private _paginator: MatPaginator,
    private _sort: MatSort,
    private _filter: Observable<string>,
    private _valMap: any,
    private _columns: any,
  ) {
    super()
    this._filter.subscribe(() => {
      this._paginator.pageIndex = 0
      this._paginator._changePageSize(this._paginator.pageSize) // to remove once angular is fixed
    })
  }

  connect(): Observable<any[]> {
    return Observable.combineLatest(
      this._database,
      this._filter,
      this._sort.sortChange.pipe(startWith(null)),
      this._paginator.page.pipe(startWith(null)),
    ).map(([data, filterChange, sortChange, pageChange]) => {
      if(!data)
        return []

      if(filterChange) {
        data = data.map(elem => {
          for(var col of this._columns) {
            let val = this._valMap(col.name, elem).toLowerCase()
            if(val.indexOf(filterChange.toLowerCase()) != -1)
              return elem
          }
          return null
        }).filter(x => x)
      }

      this._paginator.length = data.length

      if(sortChange) {
        let sortKey = sortChange.active

        data.sort((a, b) => {
          let valA, valB
          valA = this._valMap(sortKey, a).toLowerCase()
          valB = this._valMap(sortKey, b).toLowerCase()

          let sorted = valA < valB ? -1 : (valA > valB ? 1 : 0)
          let direction = sortChange.direction == 'asc' ? 1 : -1

          return sorted * direction
        })
      }

      if(pageChange) {
        let start = pageChange.pageIndex * pageChange.pageSize
        let end = start + pageChange.pageSize
        data = data.slice(start, end)
      }

      return data
    })
  }

  disconnect(): void { }

}
