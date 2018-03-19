import { Directive, ElementRef, Input } from '@angular/core'

@Directive({
  selector: '[gen-folding-p]',
})
export class FoldingPDirective {

  @Input() textLimit: number  = 400
  private _isOpen:    boolean = false

  constructor(
    private _el: ElementRef
  ) { }

  ngOnInit() {
    let text = this._el.nativeElement.innerHTML as string

    if(text.length > this.textLimit) {
      let btn              = document.createElement('a')
      btn.style.display    = "block"
      btn.style.paddingTop = "8px"
      let btnText          = document.createTextNode('+ more')
      btn.addEventListener('click', () => {
        this._isOpen = !this._isOpen
        btn.text     = this._isOpen ? '- less': '+ more'

        if(this._isOpen)
          this._el.nativeElement.innerHTML = text
        else
          this._el.nativeElement.innerHTML = text.substr(0, this.textLimit).trim() + "&hellip;"
        this._el.nativeElement.appendChild(btn)
      })
      btn.appendChild(btnText)

      this._el.nativeElement.innerHTML = text.substr(0, this.textLimit).trim() + '&hellip;'
      this._el.nativeElement.appendChild(btn)
    }
  }



}
