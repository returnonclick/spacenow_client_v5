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

import { PageCategory } from '@shared/models/page-category'

export class Page {
  title: string
  slug: string
  content: string
  categoryId: string
  pageId: string
  createdOn: string
  createdBy: string

  constructor() { }
}

export default [ Page ]
