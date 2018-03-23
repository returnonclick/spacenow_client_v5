import { Directive, ElementRef } from '@angular/core'

@Directive({
  selector: 'div[gen-folding-div]'
})
export class FoldingDivDirective {

  private _isOpen: boolean

  constructor(
    private _el: ElementRef,
  ) { }

  ngAfterViewInit() {
    let dom           = this._el.nativeElement
    dom.style.height   = '400px'
    dom.style.overflow = 'hidden'

    let btnText       = document.createTextNode('+ more')
    let btn           = document.createElement('a')
    btn.style.display = 'block'
    btn.style.padding = '12px'
    btn.style.cursor  = 'pointer'
    btn.appendChild(btnText)
    btn.addEventListener('click', () => {
      this._isOpen = !this._isOpen
      btn.text     = this._isOpen ? '- less': '+ more'

      if(this._isOpen) {
        dom.style.height   = 'auto'
        dom.style.overflow = 'visible'
      }
      else {
        dom.style.height   = '400px'
        dom.style.overflow = 'hidden'
      }
    })

    dom.parentNode.appendChild(btn)
  }

}
