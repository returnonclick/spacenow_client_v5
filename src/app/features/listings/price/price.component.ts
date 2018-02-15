import { Component, Input, OnInit, OnChanges, ViewChild, ComponentFactoryResolver, Type } from '@angular/core'
import { SNPriceDirective } from './price.directive';

import {
    HourlyComponent,
    DailyComponent,
    WeeklyComponent,
    MonthlyComponent
} from './'


@Component({
  selector: 'sn-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.scss']
})

export class PriceComponent implements OnInit, OnChanges {

    @Input() unit: string

    @ViewChild(SNPriceDirective) snPriceHost: SNPriceDirective;
    
    componentUnit: { [key: string]: Type<any> } = {
        daily: DailyComponent,
        weekly: WeeklyComponent,
        monthly: MonthlyComponent,
        hourly: HourlyComponent
    }
    
    constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

    ngOnInit() {
        this.loadComponent()
    }

    ngOnChanges() {
        this.loadComponent()
    }

    loadComponent() {
        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.componentUnit[this.unit])
        let viewContainerRef = this.snPriceHost.viewContainerRef
        viewContainerRef.clear()
        let componentRef = viewContainerRef.createComponent(componentFactory)
    }

}