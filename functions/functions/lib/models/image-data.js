"use strict";
/*
 * ImageDataModel casts image meta data
 * Each image uploaded will be resized and regenerated
 * in various sizes: original, fullwidth, halfwidth, thumbnail
 *
 * Path to Firebase Storage: `images/...`.
 * `/images/{MODULE}/{moduleID}/{imageID}/{IMAGE_FILE_IN_VARIOUS_SIZE.JPG}`
 * IMAGE_FILE_IN_VARIOUS_SIZE = `original.jpg` | `fullsize.jpg`
 * `halfsize.jpg` | `quartersize.jpg` | `thumbnail.jpg`
 *
 *  */
Object.defineProperty(exports, "__esModule", { value: true });
class ImageData extends Object {
    constructor(model = null) {
        super();
        this.id = '';
        this.path = ''; // Path to image files
        this.title = ''; // Image name - used in `<alt>` tag
        this.tags = new Array();
        this.imageURL = '';
        this.storageRef = '';
        if (model) {
            this.id = model.id || '';
            this.path = model.path || '';
            this.title = model.title || '';
            this.tags = model.tags || new Array();
            this.imageURL = model.imageURL || '';
            this.storageRef = model.storageRef || '';
        }
    }
}
exports.ImageData = ImageData;
//# sourceMappingURL=image-data.js.map