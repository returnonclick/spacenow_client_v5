import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContainerComponent } from './container/container.component'
import { PriceComponent } from './price/price.component'
import { CategoryComponent } from './category/category.component'
import { AmenityComponent } from './amenity/amenity.component'
import { SpecificationComponent } from './specification/specification.component'
import { AddressComponent } from './address/address.component'
import { DescriptionComponent } from './description/description.component'
import { BookingComponent } from './booking/booking.component'
import { ExceptionComponent } from './exception/exception.component'
import { ImageComponent } from './image/image.component'
import { TermComponent } from './term/term.component'

 
const routes: Routes = [

  {
    path: '',
    component: ContainerComponent,
    children: [
      { path: 'category', component: CategoryComponent },
      { path: '', redirectTo: '/category', pathMatch: 'full' }
    ]
  },
  {
    path: ':id',
    component: ContainerComponent,
    children: [
        { path: 'category', component: CategoryComponent },
        { path: 'price', component: PriceComponent },
        { path: 'amenity', component: AmenityComponent },
        { path: 'specification', component: SpecificationComponent },
        { path: 'address', component: AddressComponent },
        { path: 'description', component: DescriptionComponent },
        { path: 'image', component: ImageComponent },
        { path: 'booking', component: BookingComponent },
        { path: 'exception', component: ExceptionComponent },
        { path: 'terms', component: TermComponent },
        { path: '', redirectTo: '/title', pathMatch: 'full' }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListingsRoutingModule { }
