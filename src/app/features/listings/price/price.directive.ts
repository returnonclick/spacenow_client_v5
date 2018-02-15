import { Directive, ViewContainerRef } from '@angular/core';
@Directive({
  selector: '[d-sn-price]'
})
export class SNPriceDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}