import { Component, OnInit } from '@angular/core';
import { UserDataService, User } from "../user-data.service";
import { AuthorizationService } from "../auth/authorization.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public user = this.data.user;
  currentEmail:any;

  constructor(private data:UserDataService, private auth:AuthorizationService) {
    this.currentEmail = sessionStorage.getItem('currentUsername');
  }

  ngOnInit(): void {
  }

}
