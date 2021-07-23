import { Component, OnChanges, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { User } from 'src/models/user.class';
import { DialogDeleteUserComponent } from '../dialog-delete-user/dialog-delete-user.component';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { FileUploadService } from '../services/file-upload.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  userId: string = '';
  user: User = new User();
  dateOfBirth: number;
  profileImageURL: string = '';

  url = new Subject<string>();
  url$ = this.url.asObservable();

  constructor(
    private route: ActivatedRoute,
    private firestore: AngularFirestore,
    public dialog: MatDialog,
    public fileUpload: FileUploadService
  ) { }

  ngOnInit(): void {

    this.getUserId();
    this.getUser();

    //receive URL from uploaded file
    this.fileUpload.url = this.url;
    this.url.subscribe(async (url) => {
      console.log("New URL", url);
      //save received URL in user object
      this.user.profileImageURL = url;
      //save new user data to Angular Firestore
      this.updateUser();
    });
  }

  /**
   * Gets user id from URL.
   */
  getUserId() {
    this.route.params.subscribe(params => {
      this.userId = params['id'];
    })
  }

  /**
   * Gets user data from user with a specific id in Angular Firestore.
   */
  getUser() {
    this.firestore
      .collection('users')
      .doc(this.userId)
      .valueChanges({ idField: 'userId' })
      .subscribe((user: any) => {
        //The received json object is directly transformed into an object of type User (the class which I have created in models > user.class.ts)
        //See class user.class.ts => The passed parameter is here "user".
        this.user = new User(user);
        //console.log("Retrieved user: ", this.user);
      })
  }

  /**
   * Opens dialog for editing user data.
   */
  openEditUserHeader() {
    const dialog = this.dialog.open(DialogEditUserComponent);
    //Kopie von User erstellen. Ansonsten ändern sich die Daten direkt bei Eingabe.
    //Statt "... = this.user" schreiben wir also "... = new User(this.user)" und erstellen damit eine Kopie.
    //Im Detail: this.user wird zunächst in ein JSON umgewandelt und dieses wird dann als Parameter bei der Erstellung des neuen User-Objektes übergeben.
    dialog.componentInstance.user = new User(Object.assign({}, this.user));
    dialog.componentInstance.userId = this.userId;
  }

  /**
   * Opens dialog for editing user address data.
   */
  openEditUserAddress() {
    const dialog = this.dialog.open(DialogEditAddressComponent);
    dialog.componentInstance.user = new User(Object.assign({}, this.user));
    dialog.componentInstance.userId = this.userId;
  }

  /**
   * Opens dialog with user delete option.
   */
  openDeleteUser() {
    const dialog = this.dialog.open(DialogDeleteUserComponent);
    dialog.componentInstance.user = new User(Object.assign({}, this.user));
    dialog.componentInstance.userId = this.userId;
  }

  /**
   * Calls the file-upload-service for uploading a file (specificly a profile image).
   * @param  {any} event Change event for uploading a file.
   * @param  {string} userId The user's id.
   */
  onUploadFile(event: any, userId: string) {
    this.fileUpload.uploadFile(event, userId);
  };

  /**
   * Saves current user data to Angular Firestore.
   */
  updateUser() {
    this.firestore
      .collection('users')
      .doc(this.userId)
      //Transform User object into JSON for being able to save to Angular Firestore.
      .update(Object.assign({}, this.user))
  }

}