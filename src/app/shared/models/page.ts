/* 
 * MODEL NAME
 * PageModel
 * 
 * IMPORTED MODES
 * Category
 * 
 * Path to firebase: `/pages/{$pageID}`
 * 
 *  */

// import { PageCategory } from '@shared/models/page-category'

export class Page extends Object {

  id: string = ''
  slug: string = ''
  title: string = ''
  content: Content[] = []
  images: string[] = []
  author: string = ''
  tag: string = ''
  date: Date = new Date

  constructor( model: any = null ) {
    super()
    console.log('model')
    if(model) {

      this.id      = model.id || ''
      this.slug    = model.slug || ''
      this.title   = model.title || ''
      this.content = model.conten || []
      this.images  = model.images || []
      this.author  = model.author || ''
      this.tag     = model.tag || ''
      this.date    = model.date || new Date

    }
  }
}


class Content {

  title: string = '';
  description: string[] = [];

  constructor( model: any = null ) {

    if(model) { 

      this.title       = model.title || ''
      this.description = model.description || []

    }
  }

}

// Using enum while pageCategory is defined for more kind of pages
export enum Tag {
  NEWS = 'news'
}