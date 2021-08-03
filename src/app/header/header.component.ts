import { Component, OnInit } from '@angular/core';
import {MatMenu} from '@angular/material/menu';
import {MatIcon} from '@angular/material/icon';
import { UserDataService, User } from "../user-data.service";
import { AuthorizationService } from "../auth/authorization.service";
import { AccountService } from "../services/account.service";



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  is_active = "";
  currentUsername:any;
  constructor(private data:UserDataService, private auth:AuthorizationService, private acc:AccountService) {
    this.currentUsername = sessionStorage.getItem('currentUsername');
  }

  ngOnInit(): void {
  }

  loggout() {
    this.auth.loggout();
    window.location.reload();
  }

  public user = this.data.user;

  toggleNav(){
    if(this.is_active){
        this.is_active = "";
    }
    else{
        this.is_active = "_active";
    }
  }

}
