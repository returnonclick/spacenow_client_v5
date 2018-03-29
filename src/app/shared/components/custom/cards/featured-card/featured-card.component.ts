import { Component } from '@angular/core';

@Component({
  selector: 'sn-featured-card',
  templateUrl: 'featured-card.component.html',
  styleUrls: ['featured-card.component.scss']
})

export class FeaturedCardComponent {

  data: any
  imageIndex: number  = 0
  images: Array<any> = new Array()

  constructor() {}

  ngOnInit() {

    const imageUrl = 'https://backgroundcheckall.com/wp-content/uploads/2017/12/background-paisagens-2.jpg'

    this.images[0] = imageUrl
    this.images[1] = imageUrl
    this.images[2] = imageUrl

    !this.data.images ? this.data.images = this.images : this.data.images

  }

}
