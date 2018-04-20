import { NgModule } from '@angular/core'
import {Routes, RouterModule} from '@angular/router';

import { PagesComponent } from './pages.component'

// import {AuthGuard} from "../auth/_guards/auth.guard";

const routes: Routes = [
    {
        "path": "",
        "component": PagesComponent,
        "children": [
        {
            "path": "index",
            "loadChildren": "./index/index.module#IndexModule"
        },
        {
            "path": "spaces",
            "loadChildren": "./index/index.module#IndexModule"
        },
        {
            "path": "space",
            "loadChildren": "./index/index.module#IndexModule"
        },
        {
            "path": "list-space",
            "loadChildren": "./list-space/list-space.module#ListSpaceModule"
        },
        {
            "path": "profile",
            "loadChildren": "./user/profile/profile.module#ProfileModule"
        },
        {
            "path": "settings",
            "loadChildren": "./user/settings/settings.module#SettingsModule"
        },
        {
            "path": "transactions-history",
            "loadChildren": "./user/transactions-history/transactions-history.module#TransactionsHistoryModule"
        },
        {
            "path": "my-spaces",
            "loadChildren": "./user/my-spaces/my-spaces.module#MySpacesModule"
        },
        {
            "path": "manage-bookings",
            "loadChildren": "./user/manage-bookings/manage-bookings.module#ManageBookingsModule"
        },
        {
            "path": "ratings-reviews",
            "loadChildren": "./user/ratings-reviews/ratings-reviews.module#RatingsReviewsModule"
        },
        {
            "path": "checkout",
            "loadChildren": "./checkout/checkout.module#CheckoutModule"
        },
        {
            "path": "success",
            "loadChildren": "./success/success.module#SuccessModule"
        },
        {
            "path": "why",
            "loadChildren": "./support-pages/why/why.module#WhyModule"
        },
        {
            "path": "career",
            "loadChildren": "./support-pages/career/career.module#CareerModule"
        },
        {
            "path": "press",
            "loadChildren": "./support-pages/press/press.module#PressModule"
        },
        {
            "path": "help",
            "loadChildren": "./support-pages/help/help.module#HelpModule"
        },
        {
            "path": "news",
            "loadChildren": "./support-pages/news/news.module#NewsModule"
        },
        {
            "path": "about-us",
            "loadChildren": "./support-pages/about-us/about-us.module#AboutUsModule"
        },
        {
            "path": "terms-service",
            "loadChildren": "./terms-conditions/terms-service/terms-service.module#TermsServiceModule"
        },
        {
            "path": "host-terms",
            "loadChildren": "./terms-conditions/host-terms/host-terms.module#HostTermsModule"
        },
        {
            "path": "privacy-policy",
            "loadChildren": "./terms-conditions/privacy-policy/privacy-policy.module#PrivacyPolicyModule"
        },
        {
            "path": "refund-cancellation-policy",
            "loadChildren": "./terms-conditions/refund-cancellation-policy/refund-cancellation-policy.module#RefundCancellationPolicyModule"
        },
        {
            "path": "dictionary",
            "loadChildren": "./terms-conditions/dictionary/dictionary.module#DictionaryModule"
        },
        {
            "path": "404",
            "loadChildren": "./not-found/not-found.module#NotFoundModule"
        },
        {
            "path": "",
            "redirectTo": "index",
            "pathMatch": "full"
        }
        ]
    },
    {
        "path": "**",
        "redirectTo": "404",
        "pathMatch": "full"
    }
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class PagesRoutingModule { }