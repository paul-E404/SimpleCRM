import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  userId: any = '';
  user: User = new User();

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.getUserId();
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
      .valueChanges()
      .subscribe((user: any) => {
        //Das JSON-Object, welches wir bekommen wird direkt in ein Object vom Typ User (diese Klasse haben wir selbst definiert) umgewandelt.
        //Siehe Klasse user.class.ts => Der übergebene obj Parameter ist hier user.
        this.user = new User(user);
        console.log("Retrieved user: ", this.user);
      })
  }

  editUserHeader() {
    console.log("editUserHeader() ausgeführt");
  }

  editUserAddress() {
    console.log("editUserAddress() ausgeführt");
  }

}
