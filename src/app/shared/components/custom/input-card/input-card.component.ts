import {FocusMonitor} from '@angular/cdk/a11y';
import {coerceBooleanProperty} from '@angular/cdk/coercion';
import {Component, ElementRef, Input, OnDestroy, Renderer2, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatFormFieldControl} from '@angular/material/form-field';
import {Subject} from 'rxjs/Subject';


/** Data structure for holding card number. */
export class InputCard {
  constructor(public part1: string, public part2: string, public part3: string, public part4: string) {}
}

/** Custom `MatFormFieldControl` for card number input. */
@Component({
  selector: 'gen-input-card',
  templateUrl: 'input-card.component.html',
  styleUrls: ['input-card.component.scss'],
  providers: [
    {
      provide: MatFormFieldControl,
      useExisting: InputCardComponent,
      multi: true
    }
  ],
  host: {
    '[class.floating]': 'shouldPlaceholderFloat',
    '[id]': 'id',
    '[attr.aria-describedby]': 'describedBy',
  }
})

export class InputCardComponent implements MatFormFieldControl<InputCard>, OnDestroy, OnInit {
  static nextId = 0;

  public parts: FormGroup;

  stateChanges = new Subject<void>();

  focused = false;

  ngControl = null;

  errorState = false;

  controlType = 'gen-input-card';

  get empty() {
    let n = this.parts.value;
    return !n.part1 && !n.part2 && !n.part3 && !n.part4;
  }

  get shouldPlaceholderFloat() {
    return this.focused || !this.empty;
  }

  id = `gen-input-card-${InputCardComponent.nextId++}`;

  describedBy = '';

  @Input()
  get placeholder() {
    return this._placeholder;
  }
  set placeholder(plh) {
    this._placeholder = plh;
    this.stateChanges.next();
  }
  private _placeholder: string;

  @Input()
  get required() {
    return this._required;
  }
  set required(req) {
    this._required = coerceBooleanProperty(req);
    this.stateChanges.next();
  }
  private _required = false;

  @Input()
  get disabled() {
    return this._disabled;
  }
  set disabled(dis) {
    this._disabled = coerceBooleanProperty(dis);
    this.stateChanges.next();
  }
  private _disabled = false;

  @Input()
  get value(): InputCard | null {
    let n = this.parts.value;
    if (n.part1.length == 4 && n.part2.length == 4 && n.part3.length == 4 && n.part4.length == 4) {
      return new InputCard(n.part1, n.part2, n.part3, n.part4);
    }
    return null;
  }
  set value(card: InputCard | null) {
    card = card || new InputCard('', '', '', '');
    this.parts.setValue({part1: card.part1, part2: card.part2, part3: card.part3, part4: card.part4});
    this.stateChanges.next();
  }

  constructor(
    private fb: FormBuilder,
    private fm: FocusMonitor,
    private elRef: ElementRef,
    private renderer: Renderer2
  ) {
  }

  ngOnInit() {
    this.createForm();
    this.fm.monitor(this.elRef.nativeElement, this.renderer, true).subscribe((origin) => {
      this.focused = !!origin;
      this.stateChanges.next();
    });
  }

  ngOnDestroy() {
    this.stateChanges.complete();
    this.fm.stopMonitoring(this.elRef.nativeElement);
  }

  createForm() {
    this.parts =  this.fb.group({
      'part1': '',
      'part2': '',
      'part3': '',
      'part4': '',
    });
  }

  setDescribedByIds(ids: string[]) {
    this.describedBy = ids.join(' ');
  }

  onContainerClick(event: MouseEvent) {
    if ((event.target as Element).tagName.toLowerCase() != 'input') {
      this.elRef.nativeElement.querySelector('input').focus();
    }
  }
}
