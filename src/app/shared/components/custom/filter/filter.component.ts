import { Component, Inject } from '@angular/core'
import { MAT_DIALOG_DATA } from '@angular/material'

@Component({
  selector: 'eff-filter',
  templateUrl: './filter.component.html'
})
export class FilterComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

}
