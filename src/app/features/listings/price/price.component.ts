import { Component, Input, Output, EventEmitter, OnInit, OnChanges, ViewChild, ComponentFactoryResolver, Type } from '@angular/core'
import { SNPriceDirective } from './price.directive';
import { Price } from '@shared/models/space'

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
    @Output() price = new EventEmitter<Price>();
    @Output() priceValid = new EventEmitter<boolean>();
    @Input() model: any

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
        componentRef.instance.price.subscribe(res => {
            this.price.emit(res)
        })
        componentRef.instance.priceValid.subscribe(priceValid => {
            this.priceValid.emit(priceValid)
        })
        componentRef.instance.inPrice = this.model
    }

}