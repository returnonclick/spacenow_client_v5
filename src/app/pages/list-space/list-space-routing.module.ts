import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContainerComponent } from './container/container.component'
 
const routes: Routes = [
  {
    "path": "",
    "component": ContainerComponent,
    "children": [
      {
        "path": "category",
        "loadChildren": "./category/category.module#CategoryModule"
      }
    ]
  },
  {
    "path": ":id",
    "component": ContainerComponent,
    "children": [
      {
        "path": "category",
        "loadChildren": "./category/category.module#CategoryModule"
      },
      {
        "path": "price",
        "loadChildren": "./price/price.module#PriceModule"
      },
      {
        "path": "amenity",
        "loadChildren": "./amenity/amenity.module#AmenityModule"
      },
      {
        "path": "specification",
        "loadChildren": "./specification/specification.module#SpecificationModule"
      },
      {
        "path": "address",
        "loadChildren": "./address/address.module#AddressModule"
      },
      {
        "path": "description",
        "loadChildren": "./description/description.module#DescriptionModule"
      },
      {
        "path": "image",
        "loadChildren": "./image/image.module#ImageModule"
      },
      {
        "path": "booking",
        "loadChildren": "./booking/booking.module#BookingModule"
      },
      {
        "path": "exception",
        "loadChildren": "./exception/exception.module#ExceptionModule"
      },
      {
        "path": "term",
        "loadChildren": "./term/term.module#TermModule"
      },
      { path: '', redirectTo: '/category', pathMatch: 'full' }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListSpaceRoutingModule { }
