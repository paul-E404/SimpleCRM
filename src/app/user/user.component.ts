import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { compare } from '../globals';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  allUsers: any;
  sortedData: any[];

  constructor(public dialog: MatDialog, private firestore: AngularFirestore) {

  }

  ngOnInit(): void {
    this.showUserList();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddUserComponent);
  }

  showUserList() {
    this.firestore
      .collection('users')
      .valueChanges({ idField: 'userId' })
      .subscribe((userData: any) => {
        this.allUsers = userData;
        console.log("Alle Nutzer Daten: ", this.allUsers);
      })
  }

  //Source: https://material.angular.io/components/sort/overview
  sortData(sort: Sort) {
    this.sortedData = this.allUsers.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'firstName': return compare(a.firstName, b.firstName, isAsc);
        case 'lastName': return compare(a.lastName, b.lastName, isAsc);
        case 'email': return compare(a.email, b.email, isAsc);
        case 'city': return compare(a.city, b.city, isAsc);
        default: return 0;
      }
    });
  }
}
