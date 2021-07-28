import { Component, OnInit } from '@angular/core';
import { UserDataService, User } from "../user-data.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public user = this.data.user;
  
  constructor(private data:UserDataService) { }

  ngOnInit(): void {
  }

}
