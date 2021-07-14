import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-delete-user',
  templateUrl: './dialog-delete-user.component.html',
  styleUrls: ['./dialog-delete-user.component.scss']
})
export class DialogDeleteUserComponent implements OnInit {

  loading: boolean = false;
  user: User;
  userId: string;

  constructor(public dialogRef: MatDialogRef<DialogDeleteUserComponent>, private firestore: AngularFirestore, private router: Router) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  deleteUser() {
    this.loading = true;
    //setTimeout is only for demonstration purpuses of mat spinner
    setTimeout(() => {
      this.firestore
      .collection('users')
      .doc(this.userId)
      .delete()
      .then(() => {
        this.onNoClick();
        this.loading = false;
        this.router.navigate(['/user']);
      })
    }, 1000)
    
  }

}
