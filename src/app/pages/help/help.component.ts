import { Component } from '@angular/core'

@Component({
  selector: 'sn-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})

export class HelpComponent {

  topQuestion: boolean = false
  whatsNew: boolean = false
  aboutSpacenow: boolean = false
  gettingStarted: boolean = false

  constructor(){}

}
 
