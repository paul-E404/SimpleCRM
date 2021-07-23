import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-edit-address',
  templateUrl: './dialog-edit-address.component.html',
  styleUrls: ['./dialog-edit-address.component.scss']
})
export class DialogEditAddressComponent implements OnInit {

  user: User;
  loading: boolean = false;
  userId: string;

  constructor(
    public dialogRef: MatDialogRef<DialogEditAddressComponent>,
    private firestore: AngularFirestore
  ) { }

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
   * Saves changed user address data to Angular Firestore.
   */
  editUserAddress() {
    this.loading = true;
    setTimeout(() => {
      this.firestore
        .collection('users')
        .doc(this.userId)
        //Transform User object into JSON for being able to update in Angular Firestore
        .update(Object.assign({}, this.user))
        .then(() => {
          this.onNoClick();
          this.loading = false;
        })
    }, 2000)
  }

}
