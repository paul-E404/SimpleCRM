import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {


  fileName: string;
  filePath: string;
  //fileUploaded: boolean = false;
  url: Subject<string>;

  constructor(private storage: AngularFireStorage) { }

  async uploadFile(event: any, userId: string) {

    const file = event.target.files[0];
    this.fileName = file.name;
    this.filePath = 'profilePictures/' + userId + '/' + this.fileName;
    const fileRef = this.storage.ref(this.filePath);
    const task = await this.storage.upload(this.filePath, file);
    console.log("FILE HOCHGELADEN!");

    //this.fileUploaded = true;
    fileRef.getDownloadURL().subscribe((url) => {
      console.log("The fileURL is: ", url, "mit dem Typ: ", typeof(url));
      this.url.next(url); //url ist der Observer; er informiert über neue Daten (also über eine neue url).
    });
  }

//Quelle: https://github.com/angular/angularfire/blob/master/docs/storage/storage.md => Weg: upload

}