import { Component, OnChanges, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/models/user.class';
import { DialogDeleteUserComponent } from '../dialog-delete-user/dialog-delete-user.component';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { FilePreviewService } from '../services/file-preview.service';
import { FileUploadService } from '../services/file-upload.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit, OnChanges {

  userId: string = '';
  user: User = new User();
  dateOfBirth: number;
  profileImagePath: string = '';

  constructor(
    private route: ActivatedRoute,
    private firestore: AngularFirestore,
    public dialog: MatDialog,
    public fileUpload: FileUploadService,
    public filePreview: FilePreviewService) { }

  ngOnInit(): void {
    this.getUserId();
    this.getUser();
    this.filePreview.previewFile(this.fileUpload.filePath, this.user.userId);
    console.log("Der Filepath lautet: ", this.fileUpload.filePath);
  }

  ngOnChanges(): void {
    this.getUser();
  }

  getUserId() {
    this.route.params.subscribe(params => {
      this.userId = params['id'];
      console.log("user ID from URL: ", this.userId);
    })
  }

  getUser() {
    this.firestore
      .collection('users')
      .doc(this.userId)
      .valueChanges({idField: 'userId'})
      .subscribe((user: any) => {
        //Das JSON-Object, welches wir bekommen wird direkt in ein Object vom Typ User (diese Klasse haben wir selbst definiert) umgewandelt.
        //Siehe Klasse user.class.ts => Der übergebene obj Parameter ist hier user.
        this.user = new User(user);

        console.log("Retrieved user: ", this.user);
      })
  }

  openEditUserHeader() {
    const dialog = this.dialog.open(DialogEditUserComponent);
    //Kopie von User erstellen. Ansonsten ändern sich die Daten direkt bei Eingabe.
    //Statt "... = this.user" schreiben wir also "... = new User(this.user)" und erstellen damit eine Kopie.
    //Im Detail: this.user wird zunächst in ein JSON umgewandelt und dieses wird dann als Parameter bei der Erstellung des neuen User-Objektes übergeben.
    dialog.componentInstance.user = new User(Object.assign({}, this.user));
    dialog.componentInstance.userId = this.userId;
  }

  openEditUserAddress() {
    const dialog = this.dialog.open(DialogEditAddressComponent);
    dialog.componentInstance.user = new User(Object.assign({}, this.user));
    dialog.componentInstance.userId = this.userId;
  }

  openDeleteUser() {
    const dialog = this.dialog.open(DialogDeleteUserComponent);
    dialog.componentInstance.user = new User(Object.assign({}, this.user));
    dialog.componentInstance.userId = this.userId;
  }

  async onUploadFile(event: any, userId: string) {
    this.profileImagePath = await this.fileUpload.uploadFile(event, userId);
    console.log("profileImagePath", this.profileImagePath);
    this.user.profileImagePath = this.profileImagePath;
    this.updateUser();
    console.log("Nutzer", this.user);
  }

  updateUser() {
    this.firestore
    .collection('users')
    .doc(this.userId)
    .update(Object.assign({}, this.user)) //User Objekt in JSON umwandeln
  }

}
