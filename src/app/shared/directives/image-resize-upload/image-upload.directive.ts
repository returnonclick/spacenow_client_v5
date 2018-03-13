import {
    Directive, ElementRef,
    OnInit, Input, Output, EventEmitter, Renderer, HostListener
} from '@angular/core';

import { Image, ResizeOptions } from './interfaces'
import { createImage, resizeImage } from './utils'

@Directive({
    selector: 'input[type=file][image-upload]'
})
export class ImageUploadDirective {

    @Output() resizedImage = new EventEmitter<Image>()

    @Input() resizeOptions: ResizeOptions
    @Input() allowedExtensions: string[]

    constructor(private _elementref: ElementRef, private _renderer: Renderer) {
    }

    @HostListener('change', ['$event'])
    private readFiles(event) {
        for (let file of event.target.files) {
            let result: Image = {
                file: file,
                url: URL.createObjectURL(file)
            };
            let ext: string = file.name.split('.').pop()
            if (this.allowedExtensions && this.allowedExtensions.length && this.allowedExtensions.indexOf(ext) === -1) {
                console.log("invalid file")
                result.error = 'Extension Not Allowed'
                this.resizedImage.emit(result)
            } else {
                this.fileToDataURL(file, result).then(r => this.resize(r))
                    .then(r => this.resizedImage.emit(r))
                    .catch(e => {
                        result.error = 'Image processing error'
                        this.resizedImage.emit(result)
                    })
            }
        }
    }

    private resize(result: Image): Promise<Image> {
        if (!this.resizeOptions) return Promise.resolve(result)
        return createImage(result.url).then(image => {
            let dataUrl = resizeImage(image, this.resizeOptions)
            let blob = this.dataURItoBlob(dataUrl);
            result.resized = {
                dataURL: dataUrl,
                type: dataUrl.match(/:(.+\/.+;)/)[1],
                blob: blob
            };
            return result
        })
    }

    private fileToDataURL(file: File, result: Image): Promise<Image> {
        return new Promise((resolve) => {
            let reader = new FileReader()
            reader.onload = function (e) {
                result.dataURL = reader.result
                resolve(result)
            }
            reader.readAsDataURL(file)
        });
    }

    // http://stackoverflow.com/questions/6850276/how-to-convert-dataurl-to-file-object-in-javascript
    private dataURItoBlob(dataURI) {
        // convert base64 to raw binary data held in a string
        // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
        let byteString = atob(dataURI.split(',')[1])

        // separate out the mime component
        let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

        // write the bytes of the string to an ArrayBuffer
        let ab = new ArrayBuffer(byteString.length)
        let ia = new Uint8Array(ab)
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i)
        }

        return new Blob([ab], {type: mimeString})

    }
}


