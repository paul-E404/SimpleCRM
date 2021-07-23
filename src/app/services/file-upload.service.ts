import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {


  fileName: string;
  filePath: string;
  url: Subject<string>;

  constructor(private storage: AngularFireStorage) { }

  //Source: https://github.com/angular/angularfire/blob/master/docs/storage/storage.md => upload

  /**
   * Uploads a file (specificly a user profile picture) to Angular Firestorage.
   * @param  {any} event Change event for uploading a file.
   * @param  {string} userId The user's id.
   */
  async uploadFile(event: any, userId: string) {
    
    //Create filepath
    const file = event.target.files[0];
    this.fileName = file.name;
    this.filePath = 'profilePictures/' + userId + '/' + this.fileName;

    //Upload file to AngularFire Storage
    const fileRef = this.storage.ref(this.filePath);
    const task = await this.storage.upload(this.filePath, file);
    
    //Subscribe file url
    fileRef.getDownloadURL().subscribe((url) => {
      //console.log("The fileURL is: ", url, "with type: ", typeof(url));
      //this.url is the observer here. It informs about new data (specificly about a new url).
      this.url.next(url);
    });
  }

}