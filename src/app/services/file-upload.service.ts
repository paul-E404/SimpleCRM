import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
/* import { Observable, Subject } from 'rxjs'; */

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

 /*  pathToFile: string;
  url: Subject<string>;
  uploadPercent: Observable<number> */
  fileName: string;

  constructor(private storage: AngularFireStorage) { }

  uploadFile(event: any) {
    console.log("event:", event);
    const file = event.target.files[0];
    this.fileName = file.name;
    const filePath = 'profilePictures/' + this.fileName;
    const task = this.storage.upload(filePath, file);
    console.log("fileName", this.fileName);
    console.log("filePath", filePath);
    console.log("task", task);
  }

//Quelle: https://github.com/angular/angularfire/blob/master/docs/storage/storage.md => Weg: upload




/*   async upload(file: File) {
    let filename = file.name.substring(0, file.name.length); // Before: .lastIndexOf('.')
    console.log(filename);
    filename = new Date().getTime() + filename;
    const filePath = this.pathToFile + '' + filename;
    const ref = this._storage.ref(filePath);
    const task = ref.put(file);
    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task
      .snapshotChanges()
      .pipe(
        finalize(() =>
          ref.getDownloadURL().subscribe((url) => {
            setTimeout(() => {
              localStorage.removeItem('noAlerts');
            }, 2000);
            this.url.next(url);
          })
        )
      )
      .subscribe();
    // const URL = ref.getDownloadURL();
    // URL.subscribe(url => {
    //   this.url.next(url);
    // });
  }


}
function finalize(arg0: () => import("rxjs").Subscription): import("rxjs").OperatorFunction<import("firebase").default.storage.UploadTaskSnapshot, unknown> {
  throw new Error('Function not implemented.');
}
 */

}