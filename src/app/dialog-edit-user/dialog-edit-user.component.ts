import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss']
})
export class DialogEditUserComponent implements OnInit {

  user: User = new User();
  loading: boolean = false;
  dateOfBirth: Date;
  userId: string;

  constructor(public dialogRef: MatDialogRef<DialogEditUserComponent>, private firestore: AngularFirestore) { }

  ngOnInit(): void {
  }

  /**
   * Closes the dialog.
   * @returns void
   */
  onNoClick(): void {
    this.dialogRef.close();
  }

  /**
   * Saves changed user data to Angular Firestore.
   */
  editUserHeader() {
    this.loading = true;
    this.user.dateOfBirth = this.dateOfBirth.getTime();
    //setTimeout is only for demonstration purpuses of mat spinner
    setTimeout(() => {
      this.firestore
        .collection('users')
        .doc(this.userId)
        //Transform User object into JSON for being able to update JSON in Angular Firestore.
        .update(Object.assign({}, this.user))
        .then(() => {
          this.onNoClick();
          this.loading = false;
        })
    }, 1000)
  }

}
