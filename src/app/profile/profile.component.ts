import { Component, OnInit } from '@angular/core';
import { UserDataService, User } from "../user-data.service";
import { AuthorizationService } from "../auth/authorization.service";
import { AccountService } from "../services/account.service";
import {MatDialog} from '@angular/material/dialog';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user:any;

  constructor(private data:UserDataService, private auth:AuthorizationService, private acc:AccountService, public dialog: MatDialog) {
    this.acc.getCurrentUser().subscribe(data => {
      this.user = data;
    })
  }

  openDialog() {
    this.dialog.open(DialogChange);
  }

  ngOnInit(): void {
  }

}

@Component({
  selector: 'dialog-change',
  templateUrl: './dialog-change.html',
  styleUrls: ['./dialog-change.scss']
})
export class DialogChange implements OnInit {

  constructor(private acc:AccountService) {}

  changeUserInfo(firstname:string, lastname:string, password:string) {
    let info:any;
    if (firstname.length != 0) {
      info = {
        "firstName": firstname
      }
      this.acc.changeUserInfo(info).subscribe(data => {
        console.log(data);
      })
    }
    setTimeout(() =>
      {
        if (lastname.length != 0) {
          info = {
            "lastName": lastname
          }
          this.acc.changeUserInfo(info).subscribe(data => {
            console.log(data);
          })
        }
      },200);
        setTimeout(() =>
          {
            if (password.length != 0) {
              info = {
                "password": password
              }
              this.acc.changeUserInfo(info).subscribe(data => {
                console.log(data);
              })
            }
          },100);
    console.log(info);
    setTimeout(() =>
      {
        window.location.reload();
      },500);
  }

  ngOnInit(): void {

  }
}
