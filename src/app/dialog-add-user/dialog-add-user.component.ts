import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent implements OnInit {

  user = new User;
  dateOfBirth: Date = new Date;
  loading: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<DialogAddUserComponent>,
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
   * Saves the created user to Angular Firestore.
   */
  saveUser() {
    this.loading = true;
    this.user.dateOfBirth = this.dateOfBirth.getTime();
    this.firestore
      .collection('users')
      //Transformation into a JSON-object for being able to save the object from type User in Angular Firestore. 
      //Source: https://stackoverflow.com/questions/48156234/function-documentreference-set-called-with-invalid-data-unsupported-field-val
      .add(Object.assign({}, this.user))
      .then(() => {
        setTimeout(() => {
          this.onNoClick();
          this.loading = false;
        }, 1000)
      })
  }

}
