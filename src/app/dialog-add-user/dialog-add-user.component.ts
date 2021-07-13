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

  constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>, private firestore: AngularFirestore) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveUser() {
    this.loading = true;
    this.user.dateOfBirth = this.dateOfBirth.getTime();
    console.log("Current user is: ", this.user);

    this.firestore
      .collection('users')
      //Umwandlung in ein JSON-Object um das Object vom Typ User im Firestore speichern zu können.
      //Source: https://stackoverflow.com/questions/48156234/function-documentreference-set-called-with-invalid-data-unsupported-field-val
      .add(Object.assign({}, this.user))
      .then((result: any) => {
        setTimeout(() => {
          this.onNoClick();
          this.loading = false;
          console.log("The result after adding to firestore is: ", result);
        }, 1000)
      })
  }

}
