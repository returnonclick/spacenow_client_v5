export interface Image {
    file: File;
    url: string;
    dataURL?: string;
    error?: string;
    resized?: {
        dataURL: string;
        type: string;
        blob: Blob;
    }
}

export interface ResizeOptions {
    resizeMaxHeight?: number;
    resizeMaxWidth?: number;
    resizeQuality?: number;
    resizeType?: string;
}
