import {
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  Input,
  Renderer2,
  ViewChild,
  ViewContainerRef,
  ElementRef,
  // ViewEncapsulation,
} from '@angular/core'
import { Observable } from 'rxjs'

/**
 *  COMPONENT USE DESCRIPTION
 *  Generic slider that maps an Array of data into any Component
 *
 *  Inputs:
 *  component:  Any Component to show as an item in the slider                          * required
 *  items:      Array of items in the format that component is expecting. Note that     * required
 *              the data will be passed under the data property
 *  perPage:    How many items to be displayed in a "page". Also should be passed as    * default: 4
 *              a custom CSS property
 *  autoPlay:   Set to true if you want to autoscroll your slider                       * default: false
 *
 *  CSS Properties:
 *  --totalItems: number of items this slider will render                               * required
 *  --perPage:    should be the same value as perPage input.                            * default: 4
 */
@Component({
  selector: 'gen-slider',
  templateUrl: './slider.component.html',
  styleUrls: [ './slider.component.scss' ],
  // encapsulation: ViewEncapsulation.None
})
export class SliderComponent {

  @Input() component:     any
  @Input() items:         any[]
  @Input() perPage:       number  = 4
  @Input() autoPlay:      boolean = false
  @Input() autoPlayDelay: number  = 3000

  @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef

  slider:      any    = null
  totalPages:  number = 0
  currentPage: number = 0

  constructor(
    private _factoryResolver: ComponentFactoryResolver,
    private _renderer: Renderer2,
    private _el: ElementRef
  ) {}

  ngOnChanges() {
    
    if (this.items.length === 0)
      return
    
    console.log(this.items)

    this._el.nativeElement.style.setProperty('--totalItems', this.items.length)
    this.slider     = this.container.element.nativeElement.parentNode
    this.totalPages = this.items.length - Math.ceil(1.0 * (this._el.nativeElement.offsetWidth / 320)) + 2//Math.ceil(1.0 * this.items.length / this.perPage)
    let factory     = this._factoryResolver.resolveComponentFactory(this.component)

    this.items.forEach(item => {
      let sliderItem = this.container.createComponent(factory)
      sliderItem.instance['data'] = item

      this._renderer.appendChild(this.slider, sliderItem.location.nativeElement)
    })

    if(this.autoPlay)
      Observable.timer(0, this.autoPlayDelay).subscribe(() => this.nextPage())
  }

  applyTransition() {
    this._renderer.setStyle(this.slider, 'transform', `translateX(calc(-340px * ${this.currentPage}))`)
  }

  nextPage() {
    this.currentPage = (++this.currentPage + this.totalPages) % this.totalPages
    this.applyTransition()
  }

  prevPage() {
    this.currentPage = (--this.currentPage + this.totalPages) % this.totalPages
    this.applyTransition()
  }

}
