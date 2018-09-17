import { Component, ViewChild, ElementRef, OnInit, Input, EventEmitter, Output } from '@angular/core';

declare var $: any;
declare var Dropzone: any;

@Component({
    selector: 'ab-dropzone',
    template: `
        <div #dropzone class="dropzone">
            <div class="dz-message" style="font-size: 2rem; color: #967ADC; text-align: center;">{{message}}</div>
        </div>
    `,
    styles: ['.dropzone {border: 2px dashed #967ADC; background: #F3F3F3;}']
})
export class DropzoneComponent implements OnInit {

    @Input() url: string;
    @Input() message: string;
    @Input() headers: {};
    @Input() params: (files, xhr) => {};
    @Input() acceptedFiles: Array<string>;  // mime types or extensions
    @Output() success = new EventEmitter<any>();
    @Output() error = new EventEmitter<any>();

    @ViewChild('dropzone') dropzoneElement: ElementRef;

    private dropzone: any;

    constructor() {
        Dropzone.autoDiscover = false;
        if (this.message === undefined) { this.message = 'Drop files here or click to upload.'; }
    }

    ngOnInit(): void {
        this.dropzone = new Dropzone(this.dropzoneElement.nativeElement,
            {url: this.url,
            params: this.params,
            headers: this.headers,
            acceptedFiles: this.dzAcceptedFiles()}
        );
        this.dropzone.on('success', (file, resp) => {
            this.success.emit(resp);
        });
        this.dropzone.on('error', (file, errorMessage, xhr) => {
            this.error.emit({status: xhr.status, errorMessage: errorMessage});
        });
        this.dropzone.on('processing', (file) => {
            this.dropzone.options.url = this.url;
            this.dropzone.options.headers = this.headers;
        });
    }

    removeFiles(): void {
        this.dropzone.removeAllFiles();
    }

    private dzAcceptedFiles() {
        if (this.acceptedFiles === undefined) { return null; }
        return this.acceptedFiles.join(',');
    }

}
