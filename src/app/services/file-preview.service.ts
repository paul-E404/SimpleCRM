import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilePreviewService {

  profileUrl: Observable<string | null>;

  constructor(private storage: AngularFireStorage) { }

  previewFile(filePath: string, userId: string) {
    console.log("Übergebene userId", userId);
    const ref = this.storage.ref(filePath);
    this.profileUrl = ref.getDownloadURL();
  }
}
