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

  user: User;
  loading: boolean = false;
  dateOfBirth: Date;
  userId: string;

  constructor(public dialogRef: MatDialogRef<DialogEditUserComponent>, private firestore: AngularFirestore) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  editUserHeader() {
    this.loading = true;
    this.user.dateOfBirth = this.dateOfBirth.getTime();
    
    //setTimeout is only for demonstration purpuses of mat spinner
    setTimeout(() => {
      this.firestore
        .collection('users')
        .doc(this.userId)
        .update(Object.assign({}, this.user)) //User Objekt in JSON umwandeln
        .then(() => {
          this.onNoClick();
          this.loading = false;
        })
    }, 1000)
  }

}
