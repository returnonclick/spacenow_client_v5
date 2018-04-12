import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContainerComponent } from './container/container.component'
import { TermComponent } from './terms/term.component'
import { HostTermComponent } from './host-terms/host-term.component'
import { PrivacyComponent } from './privacy/privacy.component'
import { DictionaryComponent } from './dictionary/dictionary.component'
import { RefundPolicyComponent } from './refund-policy/refund.component'
import { AboutComponent } from './about/about.component'
import { HelpComponent } from './help/help.component'
import { TopQuestionComponent } from './help/top-question/top-question.component'
import { AboutSpacenowComponent } from './help/about-spacenow/about-spacenow.component'
import { GettingStartedComponent } from './help/getting-started/getting-started.component'
import { HowWorksComponent } from './help/how-works/how-works.component'

 
const routes: Routes = [

  {
    path: '',
    component: ContainerComponent,
    children: [
        { path: '', redirectTo: 'terms', pathMatch: 'full' },
        { path: 'terms', component: TermComponent },
        { path: 'host-terms', component: HostTermComponent },
        { path: 'privacy', component: PrivacyComponent },
        { path: 'dictionary', component: DictionaryComponent },
        { path: 'refund-policy', component: RefundPolicyComponent },
        { path: 'about', component: AboutComponent },
        { path: 'help', component: HelpComponent,
          children: [
            { path: 'top-questions', component: TopQuestionComponent },
            { path: 'about-spacenow', component: AboutSpacenowComponent },
            { path: 'getting-started', component: GettingStartedComponent },
            { path: 'new', component: HowWorksComponent },
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
