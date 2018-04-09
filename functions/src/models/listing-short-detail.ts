import { ImageData } from './image-data'
import * as firebase from 'firebase/app'

export class ListingShortDetail {

    category:         string                      = ''
    categorySlug:     string                      = ''
    countryName:      string                      = ''
    currency:         string                      = ''
    fullAddress:      string                      = ''
    geopoint:         firebase.firestore.GeoPoint = null
    id:               string                      = ''
    images:           ImageData[]                 = []
    ownerDisplayName: string                      = ''
    price:            number                      = 0
    priceUnit:        string                      = ''
    title:            string                      = ''
    capacity:         string                      = ''
    status:           ListingStatus               = ListingStatus.DRAFT

    constructor(model: any = null) {

        if(model) {

            this.category         = model.category 
            this.categorySlug     = model.categorySlug         
            this.countryName      = model.countryName      
            this.currency         = model.currency         
            this.fullAddress      = model.fullAddress      
            this.geopoint         = model.geopoint         
            this.id               = model.id               
            this.images           = model.images           
            this.ownerDisplayName = model.ownerDisplayName 
            this.price            = model.price            
            this.priceUnit        = model.priceUnit        
            this.title            = model.title
            this.capacity         = model.capacity   
            this.status           = model.status || ListingStatus.DRAFT         

        }

    }

}

export enum ListingStatus {
    DRAFT   = 'draft',
    PENDING = 'pending',
    ACTIVE  = 'active',
    HIDDEN  = 'hidden',
    DELETED = 'deleted'
  }