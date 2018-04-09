"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ListingShortDetail {
    constructor(model = null) {
        this.category = '';
        this.categorySlug = '';
        this.countryName = '';
        this.currency = '';
        this.fullAddress = '';
        this.geopoint = null;
        this.id = '';
        this.images = [];
        this.ownerDisplayName = '';
        this.price = 0;
        this.priceUnit = '';
        this.title = '';
        this.capacity = '';
        this.status = ListingStatus.DRAFT;
        if (model) {
            this.category = model.category;
            this.categorySlug = model.categorySlug;
            this.countryName = model.countryName;
            this.currency = model.currency;
            this.fullAddress = model.fullAddress;
            this.geopoint = model.geopoint;
            this.id = model.id;
            this.images = model.images;
            this.ownerDisplayName = model.ownerDisplayName;
            this.price = model.price;
            this.priceUnit = model.priceUnit;
            this.title = model.title;
            this.capacity = model.capacity;
            this.status = model.status || ListingStatus.DRAFT;
        }
    }
}
exports.ListingShortDetail = ListingShortDetail;
var ListingStatus;
(function (ListingStatus) {
    ListingStatus["DRAFT"] = "draft";
    ListingStatus["PENDING"] = "pending";
    ListingStatus["ACTIVE"] = "active";
    ListingStatus["HIDDEN"] = "hidden";
    ListingStatus["DELETED"] = "deleted";
})(ListingStatus = exports.ListingStatus || (exports.ListingStatus = {}));
//# sourceMappingURL=listing-short-detail.js.map