import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddUserComponent, {
     /*  width: '250px',
      data: {name: this.name, animal: this.animal} */
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed with the following result: ', result);
    });
  }

}
