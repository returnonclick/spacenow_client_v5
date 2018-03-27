import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContainerComponent } from './container/container.component'
import { TermComponent } from './terms/term.component'
import { HostTermComponent } from './host-terms/host-term.component'
import { PrivacyComponent } from './privacy/privacy.component'
import { RefundPolicyComponent } from './refund-policy/refund.component'
import { AboutComponent } from './about/about.component'
import { HelpComponent } from './help/help.component'
import { TopQuestionComponent } from './help/top-question/top-question.component'
import { QuestionComponent } from './help/question/question.component'

 
const routes: Routes = [

  {
    path: '',
    component: ContainerComponent,
    children: [
        { path: '', redirectTo: 'terms', pathMatch: 'full' },
        { path: 'terms', component: TermComponent },
        { path: 'host-terms', component: HostTermComponent },
        { path: 'privacy', component: PrivacyComponent },
        { path: 'refund-policy', component: RefundPolicyComponent },
        { path: 'about', component: AboutComponent },
        { path: 'help', component: HelpComponent },
        { path: 'questions', component: QuestionComponent,
          children: [
            { path: 'top', component: TopQuestionComponent },
            // { path: 'top', component: TopQuestionComponent },
            { path: '', redirectTo: 'top', pathMatch: 'full' }
          ]    
        }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
