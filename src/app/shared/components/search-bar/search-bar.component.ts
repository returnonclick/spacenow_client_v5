import { Component, OnInit, ViewChild } from '@angular/core';

import { Router } from '@angular/router';
import { SearchService } from '@core/services/search/search.service';
import { Subject } from 'rxjs';

// Services
// import { SmoothScrollService } from '../../../service/smooth-scroll/smooth-scroll.service';

/**
 * Search bar component for searching products by name
 */
@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  /**
   * RxJs Subject 
   */
  inputSubject = new Subject<string>();

  /**
   * Searched products
   */
  products = [];
  totalFoundProducts: number;

  queryTerm: string;
  
  /**
   * Name query for searching
   */
  @ViewChild('query') queryString;
  constructor(
      // public smoothScrollService: SmoothScrollService,
      protected searchService: SearchService, 
      protected router: Router) { }


  ngOnInit() {
    this.inputSubject.debounceTime(500).subscribe(query => {
      // this.queryTerm = query;
      this.searchService.searchAllProducts(query, 10).subscribe((data) =>{
          if(data) {
            console.log(data);
            this.products = [];
            if(data.total > 0 && this.queryString.nativeElement.value.length > 0) {
                  this.totalFoundProducts = data.total;
                  this.products = data['hits'].map(product => {
                    product['_source']['id'] = product['_id'];
                    return product['_source'];
                  });
                  console.log(this.products);
            } else {
              this.products = [];
            }
          }
      });

    });
  }

  /**
   * On input name in text input
   * @param {string} query name query
   */
  change(query){
    if(query.length > 0){
      this.inputSubject.next(query);
    }else{
      this.products = [];
    }
  }

  /**
   * On select product navigate to product page
   * @param {string} productId product id
   */
  onSelect(productId){
  this.router.navigate(['/catalog/product', productId]);
    this.products = [];
    this.queryString.nativeElement.value = "";
  }


  toNumber(str: string) {
    return Number(str);
  }

  browseAllProducts(): void {
      let term = this.queryTerm; 
      // Clean up data to clear drop down search
      this.queryTerm = "";
      this.products = [];
      this.queryString.nativeElement.value = "";

      // Then navigate
      // this.smoothScrollService.smoothScroll('#catalog-page');
      this.router.navigate(['/catalog/products'], { queryParams: { term: term } });
  }

}
