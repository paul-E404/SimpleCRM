import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FilePreviewService } from './file-preview.service';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {


  fileName: string;
  filePath: string;
  fileUploaded: boolean = false;

  constructor(private storage: AngularFireStorage, public filePreview: FilePreviewService) { }

  async uploadFile(event: any, userId: string) {
    console.log("event:", event);
    const file = event.target.files[0];
    this.fileName = file.name;
    this.filePath = 'profilePictures/' + userId + '/' + this.fileName;
    const fileRef = this.storage.ref(this.filePath);
    const task = await this.storage.upload(this.filePath, file);
    console.log("FILE HOCHGELADEN!");
    this.fileUploaded = true;
    this.filePreview.previewFile(this.filePath, userId);

    return this.filePath;
  }

//Quelle: https://github.com/angular/angularfire/blob/master/docs/storage/storage.md => Weg: upload

}