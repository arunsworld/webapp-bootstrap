import { Component, OnInit, ViewChild } from '@angular/core';
import { DropzoneComponent } from '../../../library/src/public_api';


@Component({
    template: `
        <input class="form-control" placeholder="Enter file upload URL..." [(ngModel)]="url"/>
        <input class="form-control" placeholder="Enter authorization token..." [ngModel]="authToken"
        (ngModelChange)="newAuthToken($event)"/>
        <br/>
        <div class="row">
            <div class="col-sm-6">
                <ab-dropzone [url]="url" (success)="uploadSucceeded($event)"
                [params]="params" [headers]="headers" (error)="uploadedErrored($event)"
                #dropZone1></ab-dropzone>
                <br/>
                <button class="btn btn-primary" type="button" (click)="clearFilesDZ1()">Clear</button>
            </div>
            <div class="col-sm-6">
                <ab-dropzone [url]="url" (success)="uploadSucceeded($event)"
                [params]="params" [headers]="headers" (error)="uploadedErrored($event)"
                message="Upload images here." [acceptedFiles]="['image/*']"
                #dropZone2></ab-dropzone>
                <br/>
                <button class="btn btn-primary" type="button" (click)="clearFilesDZ2()">Clear</button>
            </div>
        </div>
    `
})
export class DemoDropzoneComponent implements OnInit {

    @ViewChild('dropZone1') dropZone1: DropzoneComponent;
    @ViewChild('dropZone2') dropZone2: DropzoneComponent;

    params: (files, xhr) => {};
    headers: {};
    authToken = '';
    url = '/api/files/';

    ngOnInit(): void {
        this.params = (files, xhr) => {
            return {testParam: true};
        };
    }

    newAuthToken(newToken) {
        this.headers = {Authorization: 'Bearer ' + newToken};
    }

    clearFilesDZ1() {
        this.clearFiles(this.dropZone1);
    }

    clearFilesDZ2() {
        this.clearFiles(this.dropZone2);
    }

    clearFiles(elem) {
        elem.removeFiles();
    }

    uploadSucceeded(response) {
        console.log(response);
    }

    uploadedErrored(response) {
        if (response.status === 401) { alert('You are not authenticeted. Please login.'); return; }
        alert(response.errorMessage);
    }

}
